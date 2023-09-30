require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const keccak256 = require('keccak256')
const mysql = require('mysql')
const { Console } = require('console')
const { Telegraf } = require('telegraf')
const axios = require('axios')

const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.OTHUB_DB
})

const otp_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.SYNC_DB
})

function executeOTHubQuery (query, params) {
  return new Promise((resolve, reject) => {
    othubdb_connection.query(query, params, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

async function getOTHubData (query, params) {
  try {
    const results = await executeOTHubQuery(query, params)
    return results
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

function executeOTPQuery (query, params) {
  return new Promise((resolve, reject) => {
    otp_connection.query(query, params, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

async function getOTPData (query, params) {
  try {
    const results = await executeOTPQuery(query, params)
    return results
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  url_params = purl.parse(req.url, true).query
  if(url_params.auth !== process.env.RUNTIME_AUTH){
    console.log(`Runtime request received from ${ip} with invalid auth key.`);
      resp_object = {
        status: "401",
        result: "401 Unauthorized: Auth Key does not match.",
      };
      res.send(resp_object);
      return;
  }
  
  public_address = url_params.public_address
  chain_id = url_params.chain_id
  botToken = url_params.botToken
  telegramID = url_params.telegramID
  sendScript = url_params.sendScript

  nodeRecords = []
  operatorRecord = []

  if (!public_address) {
    res.json({
      nodeRecords: nodeRecords,
      operatorRecord: operatorRecord,
      msg: ` `
    })
    return
  }

  keccak256hash = keccak256(public_address).toString('hex')
  keccak256hash = '0x' + keccak256hash
  like_keccak256hash = '%' + keccak256hash + '%'

  query = `select * from v_nodes where current_adminWallet_hashes like ?`
  params = [like_keccak256hash]
  nodeIds = await getOTPData(query, params)
    .then(results => {
      return results
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  validToken = 'no'
  if (botToken) {
    response = await axios.get(`https://api.telegram.org/bot${botToken}/getMe`)
    .then(results =>{
      return results
    }).catch(error =>{
      console.error('Error checking token:', error)
    });

    if(response){
      validToken = 'yes'
    }
  }

  if(validToken === 'yes'){
    query =
        'INSERT INTO node_operators (public_address,botToken) VALUES (?,?) ON DUPLICATE KEY UPDATE botToken = ?'
      await othubdb_connection.query(
        query,
        [public_address, botToken, botToken],
        function (error, results, fields) {
          if (error) throw error
        }
      )
  }

  if (telegramID && telegramID.length <= 10 && Number(telegramID)) {
    query =
      'INSERT INTO node_operators (public_address,telegramID) VALUES (?,?) ON DUPLICATE KEY UPDATE telegramID = ?'
    await othubdb_connection.query(
      query,
      [public_address, telegramID, telegramID],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  query = `select * from node_operators where public_address = ?`
  params = [public_address]
  operatorRecord = await getOTHubData(query, params)
    .then(results => {
      return results
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

    if (sendScript && operatorRecord[0].telegramID && operatorRecord[0].botToken) {
        msg = `
        Greetings from OThub.
        
Looks like you've added or changed your Telegram ID. Here are commands to run to install/update the othub node monitoring script on your node(s):`

        for (i = 0; i < nodeIds.length; ++i) {
          msg = msg + `

<-------Run this for Node ${nodeIds[i].tokenName}------->
wget -O /etc/cron.hourly/node-hourly-monitor https://raw.githubusercontent.com/othub-io/othub-runtime/master/public/scripts/node-monitor-hourly.sh &&
chmod +x /etc/cron.hourly/node-hourly-monitor &&
mkdir -p /etc/othub &&
echo -e "CHAT_ID="${operatorRecord[0].telegramID}" \nBOT_ID="${operatorRecord[0].botToken}" \nNODE_ID="${nodeIds[i].nodeId}" \nAPI_KEY="${process.env.NODE_OPS_KEY}" \nMAX_STORAGE_PERCENT="90"" > /etc/othub/config

          `
        }

        console.log(`Sending Message to users bot.`)
        try{
          bot = new Telegraf(operatorRecord[0].botToken)
          await bot.telegram.sendMessage(
            operatorRecord[0].telegramID ,
            msg
          )
        }catch(e){
          console.log(e);
        }
    }

  nodeRecords = []
  for (i = 0; i < nodeIds.length; ++i) {
    query = `select * from v_nodes_stats where nodeId=? order by date desc LIMIT 1`
    params = [nodeIds[i].nodeId]
    node_stat = await getOTPData(query, params)
      .then(results => {
        return results
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

    nodeRecords.push(node_stat[0])
  }

  res.json({
    nodeRecords: nodeRecords,
    operatorRecord: operatorRecord,
    msg: ``
  })
  return
})

module.exports = router

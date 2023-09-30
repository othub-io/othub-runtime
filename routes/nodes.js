require('dotenv').config()
var express = require('express')
var router = express.Router()
const mysql = require('mysql')
const purl = require('url')
const otp_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.SYNC_DB
})

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

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

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

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  orderby = url_params.orderby
  query = `select * from v_nodes where nodeStake >= 50000 AND nodeId not in ('83','98') order by ? desc`
  params = [orderby]
  v_nodes = await getOTPData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  res.json({
    v_nodes: v_nodes,
    msg: ``
  })
})

module.exports = router
require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const keccak256 = require('keccak256')
const mysql = require('mysql')
const otnodedb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'otnodedb'
})

const otp_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'otp'
})

function executeOTNODEQuery (query, params) {
  return new Promise((resolve, reject) => {
    otnodedb_connection.query(query, params, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

async function getOTNODEData (query, params) {
  try {
    const results = await executeOTNODEQuery(query, params)
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

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  url_params = purl.parse(req.url, true).query
  admin_key = url_params.admin_key
  group = url_params.group

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  console.log(`Visitor:${ip} landed on the alliance page.`)
  let allianceNodes
  let v_nodes

  if (admin_key) {
    keccak256hash = keccak256(admin_key).toString('hex')
    keccak256hash = '0x' + keccak256hash
  }

  if (group) {
    query =
      'INSERT INTO node_operators (adminKey,keccak256hash,nodeGroup) VALUES (?,?,?) ON DUPLICATE KEY UPDATE nodeGroup = ?'
    await otnodedb_connection.query(
      query,
      [admin_key, keccak256hash, group, group],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  query = `select * from otnodedb.node_operators
  where nodeGroup= ?`
  params = ['Alliance']
  allianceOperators = await getOTPData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  // allNodeIds = []
  // for (i = 0; i < allianceOperators.length; ++i) {
  //   allianceOperator = allianceOperators[i]
  //   admin_key = allianceOperator.adminKey

  //   keccak256hash = keccak256(admin_key).toString('hex')
  //   keccak256hash = '0x' + keccak256hash
  //   like_keccak256hash = '%' + keccak256hash + '%'

  //   query = `select nodeId from v_nodes where createProfile_adminWallet=? and (removedWalletsHashes not like ? or removedWalletsHashes is null) UNION select nodeId from v_nodes where addedAdminWalletsHashes like ? and (removedWalletsHashes not like ? or removedWalletsHashes is null)  `
  //   params = [
  //     admin_key,
  //     like_keccak256hash,
  //     like_keccak256hash,
  //     like_keccak256hash
  //   ]
  //   nodeIds = await getOTPData(query, params)
  //     .then(results => {
  //       //console.log('Query results:', results);
  //       return results
  //       // Use the results in your variable or perform further operations
  //     })
  //     .catch(error => {
  //       console.error('Error retrieving data:', error)
  //     })

  //   for (x = 0; x < nodeIds.length; ++x) {
  //     nodeId = nodeIds[x]
  //     allNodeIds.push(nodeId)
  //   }
  // }

  // console.log(allNodeIds)
  // totalAsk = 0
  // totalStake = 0
  // allianceNodes = []
  // for (i = 0; i < allNodeIds.length; ++i) {
  //   nodeId = allNodeIds[i].nodeId

  //   console.log(nodeId)
  //   query = `select * from v_nodes_stats where nodeId=? and nodeStake >= 50000 order by date desc LIMIT 1`
  //   params = [nodeId]
  //   node = await getOTPData(query, params)
  //     .then(results => {
  //       //console.log('Query results:', results);
  //       return results
  //       // Use the results in your variable or perform further operations
  //     })
  //     .catch(error => {
  //       console.error('Error retrieving data:', error)
  //     })

  //   totalAsk = totalAsk + Number(node[0].ask)
  //   totalStake = totalStake + Number(node[0].nodeStake)
  //   allianceNodes.push(node[0])
  // }

  query = `select * from v_nodes_stats where date = (select block_date from txs_staging order by block_date desc limit 1)and nodeGroup = ?`
  params = ['Alliance']
  allianceNodes = await getOTPData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  totalAsk = 0
  totalStake = 0
  for (i = 0; i < allianceNodes.length; ++i) {
    node = allianceNodes[i]

    totalAsk = totalAsk + Number(node.ask)
    totalStake = totalStake + Number(node.nodeStake)
  }

  avgAsk = totalAsk / Number(allianceNodes.length).toFixed(3)
  avgStake = totalStake / Number(allianceNodes.length)

  function formatNumber (number) {
    if (number >= 1000) {
      const suffixes = ['', 'K', 'M', 'B', 'T']
      const suffixIndex = Math.floor(Math.log10(number) / 3)
      const shortNumber =
        suffixIndex !== 0 ? number / Math.pow(1000, suffixIndex) : number
      const roundedNumber = Math.round(shortNumber * 10) / 10
      return (
        roundedNumber.toString().replace(/\.0$/, '') + suffixes[suffixIndex]
      )
    }
    return number.toString()
  }

  totalStake = await formatNumber(parseFloat(totalStake))
  avgStake = await formatNumber(parseFloat(avgStake))

  allianceStats = {
    totalStake: totalStake,
    avgStake: avgStake,
    avgAsk: avgAsk
  }

  query = `select * from v_nodes`
  params = []
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
    allianceNodes: allianceNodes,
    allianceOperators: allianceOperators,
    allianceStats: allianceStats,
    v_nodes: v_nodes,
    msg: ``
  })
})

module.exports = router

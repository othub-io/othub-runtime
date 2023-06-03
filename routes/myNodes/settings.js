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
  admin_key = url_params.admin_key
  chain_id = url_params.chain_id
  botToken = url_params.botToken
  telegramID = url_params.telegramID
  joinAlliance = url_params.joinAlliance

  nodeRecords = []
  operatorRecord = []

  if (!admin_key) {
    res.json({
      nodeRecords: nodeRecords,
      operatorRecord: operatorRecord,
      msg: ` `
    })
    return
  }

  if (botToken) {
    query =
      'INSERT INTO node_operators (adminKey,botToken) VALUES (?,?) ON DUPLICATE KEY UPDATE botToken = ?'
    await otnodedb_connection.query(
      query,
      [admin_key, botToken, botToken],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  if (telegramID) {
    query =
      'INSERT INTO node_operators (adminKey,telegramID) VALUES (?,?) ON DUPLICATE KEY UPDATE telegramID = ?'
    await otnodedb_connection.query(
      query,
      [admin_key, telegramID, telegramID],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  keccak256hash = keccak256(admin_key).toString('hex')
  keccak256hash = '0x' + keccak256hash
  like_keccak256hash = '%' + keccak256hash + '%'

  query = `select nodeId from v_nodes where createProfile_adminWallet=? and (removedWalletsHashes not like ? or removedWalletsHashes is null) UNION select nodeId from v_nodes where addedAdminWalletsHashes like ? and (removedWalletsHashes not like ? or removedWalletsHashes is null)  `
  params = [
    admin_key,
    like_keccak256hash,
    like_keccak256hash,
    like_keccak256hash
  ]
  nodeIds = await getOTPData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  if (joinAlliance) {
    if (nodeIds == '') {
      res.json({
        nodeRecords: nodeRecords,
        operatorRecord: operatorRecord,
        msg: `You cannot join the Alliance without a V6 Mainnet OTNode.`
      })
      return
    }

    query =
      'INSERT INTO node_operators (adminKey,keccak256hash,nodeGroup) VALUES (?,?,?) ON DUPLICATE KEY UPDATE nodeGroup = ?'
    await otnodedb_connection.query(
      query,
      [admin_key, keccak256hash, joinAlliance, joinAlliance],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  console.log(nodeIds)
  query = `select * from node_operators where adminKey= ?`
  params = [admin_key]
  operatorRecord = await getOTNODEData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  if (nodeIds && operatorRecord == '') {
    query =
      'INSERT INTO node_operators (adminKey,keccak256hash,telegramID,botToken,nodeGroup) VALUES (?,?,?,?,?)'
    await otnodedb_connection.query(
      query,
      [admin_key, keccak256hash, null, null, 'Solo'],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  query = `select * from node_operators where adminKey= ?`
  params = [admin_key]
  operatorRecord = await getOTNODEData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  nodeRecords = []
  for (i = 0; i < nodeIds.length; ++i) {
    query = `select * from v_nodes_stats where nodeId=? order by date desc LIMIT 1`
    params = [nodeIds[i].nodeId]
    node_stat = await getOTPData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
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

/* GET key page. */
router.post('/', async function (req, res, next) {
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

  admin_key = req.body.admin_key
  chain_id = req.body.chain_id
  botToken = req.body.botToken
  telegramID = req.body.telegramID
  joinAlliance = req.body.joinAlliance

  console.log(`Visitor:${ip} the node settings page.`)

  if (botToken) {
    query =
      'INSERT INTO node_operators (adminKey,botToken) VALUES (?,?) ON DUPLICATE KEY UPDATE botToken = ?'
    await otnodedb_connection.query(
      query,
      [admin_key, botToken, botToken],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  if (telegramID) {
    query =
      'INSERT INTO node_operators (adminKey,telegramID) VALUES (?,?) ON DUPLICATE KEY UPDATE telegramID = ?'
    await otnodedb_connection.query(
      query,
      [admin_key, telegramID, telegramID],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  keccak256hash = keccak256(admin_key).toString('hex')
  keccak256hash = '0x' + keccak256hash
  like_keccak256hash = '%' + keccak256hash + '%'

  query = `select nodeId from v_nodes where createProfile_adminWallet=? and (removedWalletsHashes not like ? or removedWalletsHashes is null) UNION select nodeId from v_nodes where addedAdminWalletsHashes like ? and (removedWalletsHashes not like ? or removedWalletsHashes is null)  `
  params = [
    admin_key,
    like_keccak256hash,
    like_keccak256hash,
    like_keccak256hash
  ]
  nodeIds = await getOTPData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  if (nodeIds == '') {
    res.json({
      nodeRecords: nodeRecords,
      operatorRecord: operatorRecord,
      msg: `You cannot join the Alliance without a V6 Mainnet OTNode.`
    })
    return
  }

  if (joinAlliance) {
    query =
      'INSERT INTO node_operators (adminKey,keccak256hash,nodeGroup) VALUES (?,?,?) ON DUPLICATE KEY UPDATE nodeGroup = ?'
    await otnodedb_connection.query(
      query,
      [admin_key, keccak256hash, joinAlliance, joinAlliance],
      function (error, results, fields) {
        if (error) throw error
      }
    )
  }

  query = `select * from node_operators where adminKey= ?`
  params = [admin_key]
  operatorRecord = await getOTNODEData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  res.json({
    nodeRecords: nodeRecords,
    operatorRecord: operatorRecord,
    msg: ` `
  })
  return
})

module.exports = router

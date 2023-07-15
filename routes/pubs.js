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

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  query = `select * from v_pubs`
  conditions = []
  params = []

  limit = 10000
  if (url_params.limit && Number(url_params.limit)) {
    limit = url_params.limit
  }

  if (url_params.nodeId && Number(url_params.nodeId)) {
    nodeId = Number(url_params.nodeId)
    conditions.push(`winners like ? OR winners like ? OR winners like ?`)

    nodeId = `%"${nodeId},%`
    params.push(nodeId)

    nodeId = `%,${nodeId},%`
    params.push(nodeId)

    nodeId = `%,${nodeId}"%`
    params.push(nodeId)
  }
  
  if (url_params.publisher) {
    conditions.push(`publisher = ?`)
    params.push(url_params.publisher)
  }

  order_by = 'block_ts_hour'
  if (url_params.order) {
    order_by = url_params.order
  }

  if (url_params.ual) {
    conditions.push(`ual = ?`)
    params.push(url_params.ual)
  }

  whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''
  sqlQuery = query + ' ' + whereClause + ` order by ${order_by} desc LIMIT ${limit}`

  v_pubs = ''
  console.log(sqlQuery)
  v_pubs = await getOTPData(sqlQuery, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

    if (url_params.ual) {
        console.log(v_pubs)
    }

  res.json({
    v_pubs: v_pubs,
    msg: ``
  })
})

module.exports = router

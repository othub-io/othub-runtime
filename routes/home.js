require('dotenv').config()
var express = require('express')
var router = express.Router()
const mysql = require('mysql')
const purl = require('url')
const otp_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'otp'
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
  orderby = url_params.orderby

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  query = `select * from v_nodes where nodeStake >= 50000 order by ? desc`
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

    query = `select count(*) as count from v_pubs`
  params = []
  pub_count = await getOTPData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

    query = `select * from v_pubs_stats`
    params = []
    v_pubs_stats = await getOTPData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

      query = `select * from v_pubs_stats order by date desc limit 1`
    params = []
    v_pubs_stats_24h = await getOTPData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

  tracSpent = 0

  for(i = 0; i < v_pubs_stats.length; i++){
    pub = v_pubs_stats[i]
    tracSpent = tracSpent + Number(pub.totalTracSpent)
  }

  totalStake = 0
  for(i = 0; i < v_nodes.length; i++){
    node = v_nodes[i]
    totalStake = totalStake + Number(node.nodeStake)
  }

  console.log(v_pubs_stats_24h)
  res.json({
    v_nodes: v_nodes,
    pub_count: pub_count[0].count,
    v_pubs_stats_24h: v_pubs_stats_24h[0],
    tracSpent: tracSpent,
    totalStake: totalStake,
    msg: ``
  })
})

module.exports = router

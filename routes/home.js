require('dotenv').config()
var express = require('express')
var router = express.Router()
const mysql = require('mysql')
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

  query = `select * from v_nodes where nodeStake >= 50000 order by ? desc`
  params = ['stake']
  v_nodes = await getOTPData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

    query = `select count(*) as count from v_pubs order by block_date`
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

    query = `select * from v_pubs_stats 
    where date != (select block_date from v_sys_staging_date)
    order by date`
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

    query = `select * from v_pubs_stats_last24h order by datetime`
    params = []
    v_pubs_stats_last24h = await getOTPData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

  totalTracSpent = 0
  for(i = 0; i < v_pubs_stats.length; i++){
    pub = v_pubs_stats[i]
    totalTracSpent = totalTracSpent + Number(pub.totalTracSpent)
  }

  totalStake = 0
  for(i = 0; i < v_nodes.length; i++){
    node = v_nodes[i]
    totalStake = totalStake + Number(node.nodeStake)
  }

  res.json({
    v_nodes_length: v_nodes.length,
    v_pubs_stats: v_pubs_stats,
    v_pubs_stats_last24h: v_pubs_stats_last24h,
    pub_count: pub_count[0].count,
    totalTracSpent: totalTracSpent,
    totalStake: totalStake,
    msg: ``
  })
})

module.exports = router

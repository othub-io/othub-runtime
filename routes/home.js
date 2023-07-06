require('dotenv').config()
var express = require('express')
var router = express.Router()
const mysql = require('mysql')
const purl = require('url')
const otp_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
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

  console.log(v_pubs_stats_24h[0])
  pub_count = await formatNumber(parseFloat(pub_count[0].count))
  tracSpent_24h = await formatNumber(parseFloat(Number(v_pubs_stats_24h[0].totalTracSpent).toFixed(2)))
  totalPubs_24h = await formatNumber(parseFloat(v_pubs_stats_24h[0].totalPubs))
  tracSpent = await formatNumber(parseFloat(tracSpent))
  totalStake = await formatNumber(parseFloat(totalStake))

  res.json({
    v_nodes: v_nodes,
    pub_count: pub_count,
    tracSpent: tracSpent,
    totalPubs_24h: totalPubs_24h,
    tracSpent_24h: tracSpent_24h,
    totalStake: totalStake,
    msg: ``
  })
})

module.exports = router

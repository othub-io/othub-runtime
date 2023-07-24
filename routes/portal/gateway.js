require('dotenv').config()
var express = require('express')
var router = express.Router()
const mysql = require('mysql')
const purl = require('url')
const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.OTHUB_DB
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

/* GET explore page. */
router.get('/', async function (req, res, next) {
    try{
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

    query = `select * from txn_header`
    conditions = []
    params = []

    limit = 100
    if (url_params.limit && Number(url_params.limit)) {
        limit = url_params.limit
    }

    if (url_params.account) {
        conditions.push(`public_address = ?`)
        params.push(url_params.account)
    }
    
    if (url_params.app_name) {
        conditions.push(`app_name = ?`)
        params.push(url_params.app_name)
    }

    if (url_params.ual) {
        conditions.push(`ual = ?`)
        params.push(url_params.ual)
    }

    if (url_params.order == 'minted') {
        conditions.push(`type = ?`)
        params.push('publish')

        conditions.push(`progress = ?`)
        params.push('COMPLETE')
    }

    if (url_params.order == 'pending') {
        conditions.push(`type = ?`)
        params.push('publish')

        conditions.push(`progress = ?`)
        params.push('PENDING')
    }

    conditions.push(`request in (?,?,?)`)
    params.push('publish')
    params.push('update')
    params.push('transfer')

    conditions.push(`network = ?`)
    console.log(url_params.network)
    if(url_params.network == 'Origintrail Parachain Testnet'){
        params.push('otp::testnet')
    }
    if(url_params.network == 'Origintrail Parachain Mainnet'){
        params.push('otp::mainnet')
    }

    order_by = 'created_at'
    if (url_params.order_by) {
        order_by = url_params.order_by
    }

    whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''
    sqlQuery = query + ' ' + whereClause + ` order by ${order_by} desc LIMIT ${limit}`

    txn_header = ''
    console.log(sqlQuery)
    txn_header = await getOTHubData(sqlQuery, params)
        .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
        })
        .catch(error => {
        console.error('Error retrieving data:', error)
        })

    res.json({
        txn_header: txn_header,
        msg: ``
    })
    }catch(e){
        console.log(e)
    }
})

module.exports = router

require('dotenv').config()
var express = require('express')
var router = express.Router()
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`, {
  verbose: console.log
})
const purl = require('url')
const queryTypes = require('../../../../public/util/queryTypes')
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'OTP'
})

router.get('/', async function (req, res) {
  url_params = purl.parse(req.url, true).query
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  if (!url_params.api_key) {
    console.log(`Get request without authorization.`)
    resp_object = {
      result: 'Authorization key not provided.'
    }
    res.send(resp_object)
    return
  }

  apiSpamProtection = await queryTypes.apiSpamProtection()
  type = 'v_nodes'
  api_key = url_params.api_key

  permission = await apiSpamProtection
    .getData(type, api_key)
    .then(async ({ permission }) => {
      return permission
    })
    .catch(error => console.log(`Error : ${error}`))

  if (permission == `no_user`) {
    console.log(`No user found for api key ${api_key}`)
    resp_object = {
      result: 'Unauthorized key provided.'
    }
    res.send(resp_object)
    return
  }

  if (permission == `block`) {
    console.log(`Request frequency limit hit from ${api_key}`)
    resp_object = {
      result:
        'Request blocked by spam protection. Only 1 request is allow per 30 seconds without a premium authorization key.'
    }
    res.send(resp_object)
    return
  }

  limit = url_params.limit
  if(!limit){
    limit = 500
  }

  query = `SELECT * FROM OTP.v_nodes`
  conditions = []
  params = []

  if(url_params.nodeId){
    conditions.push(`nodeId = ?`)
    params.push(url_params.nodeId)
  }

  if(url_params.networkId){
    conditions.push(`networkId = ?`)
    params.push(url_params.networkId)
  }

  if(url_params.tokenName){
    conditions.push(`tokenName = ?`)
    params.push(url_params.tokenName)
  }

  if(url_params.TokenSymbol){
    conditions.push(`TokenSymbol = ?`)
    params.push(url_params.TokenSymbol)
  }

  if(url_params.nodeOwner){
    conditions.push(`nodeOwner = ?`)
    params.push(url_params.nodeOwner)
  }

  if(url_params.nodeGroup){
    conditions.push(`nodeGroup = ?`)
    params.push(url_params.nodeGroup)
  }
  
  whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
  sqlQuery = query + ' ' + whereClause;
  sqlQuery = sqlQuery + `LIMIT ${limit}`
  console.log(sqlQuery)

  shardTable = []
  await connection.query(
    sqlQuery, params,
    function (error, row) {
      if (error) {
        throw error
      } else {
        setValue(row)
      }
    }
  )

  function setValue (value) {
    shardTable = value

    res.send(shardTable)
  }

  user = await girraph_db
    .prepare('SELECT * FROM user_header WHERE api_key = ?')
    .all(api_key)

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)

  await girraph_db
    .prepare(
      'INSERT INTO txn_header (owner_address, action, type, keywords, timestamp, ual, assertionId, operationId, status, data, otp_fee, trac_fee, epochs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run([
      user[0].owner_address,
      type,
      'api',
      null,
      abs_timestamp,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ])

  //await connection.end()
})

module.exports = router

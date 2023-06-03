require('dotenv').config()
var express = require('express')
var router = express.Router()
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`, {
  verbose: console.log
})
const purl = require('url')
const queryTypes = require('../../../../public/util/queryTypes')

const DKGClient = require('dkg.js')
const OT_NODE_HOSTNAME = process.env.OT_NODE_HOSTNAME
const OT_NODE_PORT = process.env.OT_NODE_PORT
const node_options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_PORT,
  useSSL: false,
  maxNumberOfRetries: 100
}
const dkg = new DKGClient(node_options)

router.get('/', async function (req, res) {
  url_params = purl.parse(req.url, true).query
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  console.log(url_params)
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (!url_params.api_key) {
    console.log(`Get request without authorization.`)
    resp_object = {
      result: 'Authorization key not provided.'
    }
    res.send(resp_object)
    return
  }
  api_key = url_params.api_key
  type = 'query'

  apiSpamProtection = await queryTypes.apiSpamProtection()

  permission = await apiSpamProtection
    .getData(type, api_key)
    .then(async ({ permission }) => {
      return permission
    })
    .catch(error => console.log(`Error : ${error}`))

  console.log(permission)
  console.log(api_key)
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

  if (!url_params.query) {
    console.log(`Get request with no query from ${api_key}`)
    resp_object = {
      result: 'No query provided.'
    }
    res.send(resp_object)
    return
  }
  query = url_params.query

  if (!url_params.network || url_params.network != 'otp::testnet') {
    console.log(`Query request with invalid network from ${api_key}`)
    resp_object = {
      result:
        'Invalid network provided. Current supported networks are: otp::testnet'
    }
    res.send(resp_object)
    return
  }
  network = url_params.network

  // if (
  //   !url_params.type ||
  //   url_params.type != 'CONSTRUCT' ||
  //   url_params.type != 'SELECT'
  // ) {
  //   console.log(`Query request with invalid type from ${api_key}`)
  //   resp_object = {
  //     result:
  //       'Invalid type provided. Current supported types are CONSTRUCT and SELECT.'
  //   }
  //   res.send(resp_object)
  //   return
  // }
  type = url_params.type

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)

  const queryResult = await dkg.graph.query(query, type)

  console.log(JSON.stringify(queryResult))

  data = JSON.stringify(queryResult.data)
  if (queryResult.status == 'FAILED') {
    data = JSON.stringify('Invalid Query')
  }

  user = await girraph_db
    .prepare('SELECT * FROM user_header WHERE api_key = ?')
    .all(api_key)

  await girraph_db
    .prepare(
      'INSERT INTO txn_header (owner_address, action, type, keywords, timestamp, ual, assertionId, operationId, status, data, otp_fee, trac_fee, epochs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run([
      user[0].owner_address,
      'query',
      'api',
      null,
      abs_timestamp,
      null,
      null,
      query,
      queryResult.status,
      data,
      null,
      null,
      null
    ])

  res.send(queryResult)
})

module.exports = router

require('dotenv').config()
var express = require('express')
var router = express.Router()
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`, {
  verbose: console.log
})
const purl = require('url')
const queryTypes = require('../../../../public/util/queryTypes')

router.get('/', async function (req, res) {
  url_params = purl.parse(req.url, true).query
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  type = `publish`

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

  apiSpamProtection = await queryTypes.apiSpamProtection()

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

  if (!url_params.assetData) {
    console.log(`Get request with no data from ${api_key}`)
    resp_object = {
      result: 'No data provided.'
    }
    res.send(resp_object)
    return
  }

  assetData = url_params.assetData

  let keywords = url_params.keywords
  let otp_fee = url_params.otp_fee
  let trac_fee = url_params.trac_fee
  let epochs = url_params.epochs

  function isJsonString (str) {
    try {
      JSON.parse(str)
    } catch (e) {
      return 'false'
    }
    return 'true'
  }

  valid_json = await isJsonString(assetData)
  if (valid_json == 'false') {
    console.log(`Get request with bad data from ${api_key}`)
    resp_object = {
      result: 'Invalid Json.'
    }
    res.send(resp_object)
    return
  }

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)

  user = await girraph_db
    .prepare('SELECT * FROM user_header WHERE api_key = ?')
    .all(api_key)

  console.log(epochs)
  await girraph_db
    .prepare(
      'INSERT INTO txn_header (owner_address, action, type, keywords, timestamp, ual, assertionId, operationId, status, data, otp_fee, trac_fee, epochs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run([
      user[0].owner_address,
      'publish',
      'api',
      keywords,
      abs_timestamp,
      null,
      null,
      null,
      'Pending',
      assetData,
      otp_fee,
      trac_fee,
      epochs
    ])

  resp_object = {
    result: 'Publish transaction queued successfully.',
    owner_address: user[0].owner_address
  }

  res.send(resp_object)
})

module.exports = router

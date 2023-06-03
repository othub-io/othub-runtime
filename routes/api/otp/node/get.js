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
  try {
    url_params = purl.parse(req.url, true).query
    ip = req.socket.remoteAddress
    if (process.env.SSL_KEY_PATH) {
      ip = req.headers['x-forwarded-for']
    }

    type = `get`

    res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(url_params)

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

    if (!url_params.ual) {
      console.log(`Get request with no ual from ${api_key}`)
      resp_object = {
        result: 'No UAL provided.'
      }
      res.send(resp_object)
      return
    }

    ual = url_params.ual

    if (!url_params.network || url_params.network != 'otp::testnet') {
      console.log(`Get request with invalid network from ${api_key}`)
      resp_object = {
        result:
          'Invalid network provided. Current supported networks are: otp::testnet'
      }
      res.send(resp_object)
      return
    }

    network = url_params.network

    timestamp = new Date()
    abs_timestamp = Math.abs(timestamp)

    console.log('UAL: ' + ual)
    dkg_get_result = await dkg.asset
      .get(ual, {
        validate: true,
        maxNumberOfRetries: 30,
        frequency: 1,
        blockchain: {
          name: network,
          publicKey: process.env.PUBLIC_KEY,
          privateKey: process.env.PRIVATE_KEY
        }
      })
      .then(result => {
        //console.log(JSON.stringify(result))
        return result
      })
      .catch(error => {
        console.log(error)
      })

    user = await girraph_db
      .prepare('SELECT * FROM user_header WHERE api_key = ?')
      .all(api_key)

    await girraph_db
      .prepare(
        'INSERT INTO txn_header (owner_address, action, type, keywords, timestamp, ual, assertionId, operationId, status, data, otp_fee, trac_fee, epochs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .run([
        user[0].owner_address,
        'get',
        'api',
        null,
        abs_timestamp,
        ual,
        dkg_get_result.assertionId,
        dkg_get_result.operation.operationId,
        dkg_get_result.operation.status,
        JSON.stringify(dkg_get_result.assertion[0]),
        null,
        'free',
        null
      ])

    res.send(dkg_get_result)
  } catch (e) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(dkg_get_result)
  }
})

module.exports = router

require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const queryTypes = require('../public/util/queryTypes')

const DKGClient = require('dkg.js')
const OT_NODE_HOSTNAME = process.env.OT_NODE_HOSTNAME
const OT_NODE_PORT = process.env.OT_NODE_PORT
const node_options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_PORT,
  useSSL: true,
  maxNumberOfRetries: 100
}
const dkg = new DKGClient(node_options)

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }
  console.log(`Visitor:${ip} looked up a UAL.`)

  url_params = purl.parse(req.url, true).query
  ual = url_params.ual

  if (!ual) {
    console.log(`Visitor:${ip} landed on the lookup page.`)
    res.render('lookup')
    return
  }

  request = 'get'
  spamCheck = await queryTypes.webSpamProtection()
  permission = await spamCheck
    .getData(request, ip)
    .then(async ({ permission }) => {
      return permission
    })
    .catch(error => console.log(`Error : ${error}`))

  if (permission != 'allow') {
    res.render('lookup', {
      data: 'blocked'
    })
    return
  }

  console.log('UAL: ' + ual)
  dkg_get_result = await dkg.asset
    .get(ual, {
      validate: true,
      maxNumberOfRetries: 30,
      frequency: 1,
      state: 'LATEST_FINALIZED',
      contentType: 'all',
      blockchain: {
        name: 'otp::testnet',
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY
      }
    })
    .then(result => {
      return result
    })
    .catch(error => {
      console.log(error)
    })

  if (!dkg_get_result) {
    res.render('lookup', {
      data: 'error'
    })
    return
  }

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)

  if (url_params.account) {
    await girraph_db
      .prepare(
        'INSERT INTO txn_header (owner_address, action, type, keywords, timestamp, ual, assertionId, operationId, status, data, otp_fee, trac_fee, epochs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .run([
        url_params.owner_address,
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
  }

  console.log(dkg_get_result)
  res.render('lookup', { data: dkg_get_result })
})

module.exports = router

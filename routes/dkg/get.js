require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')

const DKGClient = require('dkg.js')
const OT_NODE_HOSTNAME = process.env.OT_NODE_HOSTNAME
const OT_NODE_TESTNET_PORT = process.env.OT_NODE_TESTNET_PORT
const OT_NODE_MAINNET_PORT = process.env.OT_NODE_MAINNET_PORT

const testnet_node_options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_TESTNET_PORT,
  useSSL: true,
  maxNumberOfRetries: 100
}

const mainnet_node_options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_MAINNET_PORT,
  useSSL: true,
  maxNumberOfRetries: 100
}

const testnet_dkg = new DKGClient(testnet_node_options)
const mainnet_dkg = new DKGClient(mainnet_node_options)

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }
  console.log(`Visitor:${ip} looked up a UAL.`)

  url_params = purl.parse(req.url, true).query
  ual = url_params.ual
  chain = url_params.chain

  if (!ual) {
    console.log(`Visitor:${ip} landed on the lookup page.`)
    res.json({
      payload_data: 'No UAL'
    })
    return
  }

  request = 'get'
  // spamCheck = await queryTypes.webSpamProtection()
  // permission = await spamCheck
  //   .getData(request, ip)
  //   .then(async ({ permission }) => {
  //     return permission
  //   })
  //   .catch(error => console.log(`Error : ${error}`))

  // if (permission != 'allow') {
  //   res.render('lookup', {
  //     data: 'blocked'
  //   })
  //   return
  // }

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
    res.json({
      payload_data: 'Error'
    })
    return
  }

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)


  console.log(dkg_get_result)
  res.json({
    payload_data: dkg_get_result
  })
  return
})

module.exports = router

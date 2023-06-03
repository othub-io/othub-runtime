require('dotenv').config()
var express = require('express')
var router = express.Router()
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`, {
  verbose: console.log
})

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  console.log(`Visitor:${ip} landed on the publish page.`)
  res.render('publish')
})

router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }
  request = 'publish'
  //   spamCheck = await queryTypes.webSpamProtection();
  //   permission = await spamCheck
  //     .getData(request, ip)
  //     .then(async ({ permission }) => {
  //       return permission;
  //     })
  //     .catch((error) => console.log(`Error : ${error}`));

  //   if (permission != "allow") {
  //     res.render("publish", {
  //       blocked: "You can only submit 1 publish request per 30 seconds.",
  //     });
  //   }

  keywords = req.body.keywords
  ual = req.body.ual
  epochs = req.body.epochs
  owner_address = req.body.owner_address
  txn_id = req.body.txn_id
  assertionId = req.body.assertionId
  operationId = req.body.operationId
  assetData = req.body.txn_data
  type = req.body.type
  dkg_publish_result = req.body.dkg_txn

  if (!req.body.fee) {
    fee = 'default'
  } else {
    fee = req.body.fee
  }

  pub_status = `Approved`

  if (!ual) {
    pub_status = `Failed`
  }

  if (ual == 'rejected') {
    pub_status = `Rejected`
  }

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)

  await girraph_db
    .prepare(
      'INSERT INTO txn_header (owner_address, action, type, keywords, timestamp, ual, assertionId, operationId, status, data, otp_fee, trac_fee, epochs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    )
    .run([
      owner_address,
      'publish',
      type,
      keywords,
      abs_timestamp,
      null,
      null,
      null,
      pub_status,
      assetData,
      null,
      fee,
      epochs
    ])

  res.render('publish', { data: dkg_publish_result, timestamp: timestamp })
})

module.exports = router

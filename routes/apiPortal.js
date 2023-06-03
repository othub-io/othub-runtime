require('dotenv').config()
var express = require('express')
var router = express.Router()
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`, {
  verbose: console.log
})
const purl = require('url')

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  url_params = purl.parse(req.url, true).query
  owner_address = url_params.owner_address

  if (!owner_address) {
    res.render('explore')
    return
  }

  user = await girraph_db
    .prepare('SELECT * FROM user_header WHERE owner_address = ? COLLATE NOCASE')
    .all(owner_address)

  if (user == '') {
    await girraph_db
      .prepare('INSERT INTO user_header VALUES (?,?)')
      .run([owner_address, null])

    res.render('apiPortal', {
      owner_address: owner_address
    })
    return
  }

  console.log(`USER: ${JSON.stringify(user)}`)
  if (user[0].length < 2) {
    res.render('apiPortal', {
      owner_address: owner_address
    })
    return
  }

  api_txns = await girraph_db
    .prepare(
      'SELECT th.txn_id, th.owner_address, th.action, th.type, th.keywords, th.timestamp, th.ual, th.assertionId, th.operationId, th.status, th.otp_fee, th.trac_fee, th.epochs FROM txn_header th JOIN user_header uh on uh.owner_address = th.owner_address WHERE th.owner_address = ? COLLATE NOCASE and uh.api_key not null AND th.type = ? ORDER BY th.timestamp DESC'
    )
    .all(owner_address, 'api')

  if (!api_txns) {
    res.render('apiPortal', {
      api_key: user[0].api_key,
      owner_address: owner_address
    })
  }

  txn_data = await girraph_db
    .prepare(
      'SELECT th.txn_id, th.data FROM txn_header th JOIN user_header uh on uh.owner_address = th.owner_address WHERE th.owner_address = ? COLLATE NOCASE and uh.api_key not null AND th.type = ? ORDER BY th.timestamp DESC'
    )
    .all(owner_address, 'api')

  txn_data_list = []
  for (i = 0; i < txn_data.length; ++i) {
    data = txn_data[i]
    data = JSON.parse(data.data)

    txn = {
      txn_id: txn_data[i].txn_id,
      data: data
    }

    txn_data_list.push(txn)
  }

  res.render('apiPortal', {
    api_key: user[0].api_key,
    api_txns: api_txns,
    api_data: txn_data_list,
    owner_address: owner_address
  })
  console.log(`Visitor:${ip} landed on the apiPortal page.`)
})

//POST
router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  keywords = req.body.keywords
  ual = req.body.ual
  epochs = req.body.epochs
  owner_address = req.body.owner_address
  txn_id = req.body.txn_id
  assertionId = req.body.assertionId
  operationId = req.body.operationId

  console.log('TXN ID : ' + txn_id)
  console.log('OWNERS : ' + owner_address)

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
    ual = null
  }

  await girraph_db
    .prepare(
      `UPDATE txn_header SET status = ?, keywords = ?, ual = ?, epochs = ?, trac_fee = ?, assertionId = ?, operationId = ? WHERE txn_id = ?`
    )
    .run(
      pub_status,
      keywords,
      ual,
      epochs,
      fee,
      assertionId,
      operationId,
      txn_id
    )

  api_txns = await girraph_db
    .prepare(
      'SELECT th.txn_id, th.owner_address, th.action, th.type, th.keywords, th.timestamp, th.ual, th.assertionId, th.operationId, th.status, th.otp_fee, th.trac_fee, th.epochs FROM txn_header th JOIN user_header uh on uh.owner_address = th.owner_address WHERE th.owner_address = ? COLLATE NOCASE and uh.api_key not null AND th.type = ? ORDER BY th.timestamp DESC'
    )
    .all(owner_address, 'api')

  txn_data = await girraph_db
    .prepare(
      'SELECT th.txn_id, th.data, th.type FROM txn_header th JOIN user_header uh on uh.owner_address = th.owner_address WHERE th.owner_address = ?  AND th.type = ? COLLATE NOCASE and uh.api_key not null ORDER BY th.timestamp DESC'
    )
    .all(owner_address, 'api')

  txn_data_list = []
  for (i = 0; i < txn_data.length; ++i) {
    data = txn_data[i]

    if (data.data) {
      data = JSON.parse(data.data)
      txn = {
        txn_id: txn_data[i].txn_id,
        data: data
      }

      txn_data_list.push(txn)
    }
  }

  res.render('apiPortal', {
    api_key: user[0].api_key,
    api_txns: api_txns,
    api_data: txn_data_list,
    owner_address: owner_address
  })
  console.log(`Visitor:${ip} landed on the apiPortal page.`)
})

module.exports = router

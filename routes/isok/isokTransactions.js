require('dotenv').config()
var express = require('express')
var router = express.Router()
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`)
const game_db = require('better-sqlite3')(process.env.GAME_DB)
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
    console.log(`Visitor:${ip} landed on the explore page.`)
    res.render('isokTransactions')
    return
  }

  game_txns = await girraph_db
    .prepare(
      `SELECT th.txn_id, th.owner_address, th.action, th.type, th.keywords, th.timestamp, th.ual, th.assertionId, th.operationId, th.status, th.otp_fee, th.trac_fee, th.epochs FROM txn_header th WHERE th.owner_address = ? COLLATE NOCASE AND th.type = ? ORDER BY th.timestamp DESC`
    )
    .all(owner_address, 'isok')

  if (!game_txns) {
    res.render('isokTransactions', {
      owner_address: owner_address
    })
    return
  }

  game_txn_data = await girraph_db
    .prepare(
      'SELECT th.txn_id, th.data FROM txn_header th WHERE th.owner_address = ? COLLATE NOCASE AND th.type = ? ORDER BY th.timestamp DESC'
    )
    .all(owner_address, 'isok')

  game_txn_data_list = []
  for (i = 0; i < game_txn_data.length; ++i) {
    data = game_txn_data[i]
    data = JSON.parse(data.data)

    txn = {
      txn_id: game_txn_data[i].txn_id,
      data: data
    }

    game_txn_data_list.push(txn)
  }

  console.log(`Visitor:${ip} landed on the ISOK Transaction page.`)
  res.render('isokTransactions', {
    owner_address: owner_address,
    game_txns: game_txns,
    game_txn_data: game_txn_data_list
  })
})

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
  type = req.body.type
  action = req.body.action
  assetData = JSON.parse(req.body.assetData)

  console.log('TXN ID : ' + txn_id)
  console.log('OWNERS : ' + owner_address)

  if (!req.body.fee) {
    fee = 'default'
  } else {
    fee = req.body.fee
  }

  pub_status = `Approved`
  if (!req.body.txn_id) {
    if (!ual) {
      pub_status = `Failed`
    }

    await girraph_db
      .prepare(
        `INSERT INTO txn_header (status, type, keywords,ual,epochs,trac_fee,assertionId,operationId,action) VALUES (?,?,?,?,?,?,?,?,?)`
      )
      .run(
        pub_status,
        type,
        keywords,
        ual,
        epochs,
        fee,
        assertionId,
        operationId,
        action
      )
  }

  if (req.body.txn_id) {
    if (!ual) {
      pub_status = `Failed`
    }

    if (ual == 'rejected') {
      pub_status = `Rejected`
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
  }

  if (action == 'account creation') {
    await game_db
      .prepare(`REPLACE INTO player_header VALUES (?,?,?,?,?,?,?,?)`)
      .run(
        owner_address,
        ual,
        assetData.account.name,
        assetData.account.chat_id,
        JSON.stringify(assetData.account.knowledge),
        JSON.stringify(assetData.account.inventory),
        JSON.stringify(assetData.account.explores),
        JSON.stringify(assetData.account.treks)
      )
  }

  if (type == 'item creation') {
    const row = await game_db
      .prepare('SELECT * FROM player_header WHERE chat_id = ? AND username = ?')
      .get(assetData.account.chat_id, assetData.account.name)

    item_inv = row.inventory
    index = await item_inv.findIndex(itm => itm.name == assetData.name)

    if (item.quantity - 1 == 0) {
      item_inv.splice([index], 1)
    } else {
      item_inv[index]['quantity'] = item.quantity - 1
    }

    assetData['ual'] = ual
    console.log(`THIS IS YOUR ITEM: ${assetData}`)
    item_inv.push(assetData)

    console.log(`INVENTORY AFTER ITEM EXTRACT: ${JSON.stringify(item_inv)}`)
    account_data = {
      chat_id: assetData.account.chat_id,
      name: assetData.account.name,
      owner_address: owner_address,
      knowledge: JSON.parse(row.knowledge),
      inventory: item_inv,
      explores: JSON.parse(row.explores),
      treks: JSON.parse(row.treks)
    }

    console.log(`Updating UAL: ${row.ual}`)
    console.log(`Saving Data: ${JSON.stringify(account_data)}`)
    // dkg_update_result = await dkg.asset
    //   .update(row.ual, account_data, {
    //     keywords: keywords,
    //     epochsNum: 2,
    //     maxNumberOfRetries: 30,
    //     frequency: 1,
    //     blockchain: {
    //       name: process.env.DKG_NETWORK,
    //       publicKey: public_key,
    //       privateKey: private_key,
    //     },
    //   })
    //   .then((result) => {
    //     return result;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    await db
      .prepare(
        `UPDATE player_header SET inventory = ? WHERE chat_id = ? AND username = ?`
      )
      .run(
        JSON.stringify(item_inv),
        assetData.account.chat_id,
        assetData.account.name
      )
  }

  game_txns = await girraph_db
    .prepare(
      `SELECT th.txn_id, th.owner_address, th.action, th.type, th.keywords, th.timestamp, th.ual, th.assertionId, th.operationId, th.status, th.otp_fee, th.trac_fee, th.epochs FROM txn_header th WHERE th.owner_address = ? COLLATE NOCASE AND th.type = ? ORDER BY th.timestamp DESC`
    )
    .all(owner_address, 'isok')

  if (!game_txns) {
    res.render('isokTransactions', {
      owner_address: owner_address
    })
    return
  }

  game_txn_data = await girraph_db
    .prepare(
      'SELECT th.txn_id, th.data FROM txn_header th WHERE th.owner_address = ? COLLATE NOCASE AND th.type = ? ORDER BY th.timestamp DESC'
    )
    .all(owner_address, 'isok')

  game_txn_data_list = []
  for (i = 0; i < game_txn_data.length; ++i) {
    data = game_txn_data[i]
    data = JSON.parse(data.data)

    txn = {
      txn_id: game_txn_data[i].txn_id,
      data: data
    }

    game_txn_data_list.push(txn)
  }

  console.log(`Visitor:${ip} landed on the ISOK Transaction page.`)
  res.render('isokTransactions', {
    owner_address: owner_address,
    game_txns: game_txns,
    game_txn_data: game_txn_data_list
  })
})

module.exports = router

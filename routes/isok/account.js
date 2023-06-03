require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`)
const game_db = require('better-sqlite3')(process.env.GAME_DB)

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  url_params = purl.parse(req.url, true).query
  ual = url_params.ual
  owner_address = url_params.owner_address
  item_ual = url_params.item_ual
  player = ''
  item_index = ''

  ual_found = 'no'
  if (ual) {
    player = await game_db
      .prepare('SELECT * FROM player_header WHERE ual = ?')
      .all(ual)
  }

  if (player != '') {
    ual_found = 'yes'
  }

  if (ual_found == 'no' && owner_address) {
    player = await game_db
      .prepare(
        'SELECT * FROM player_header WHERE owner_address = ? COLLATE NOCASE'
      )
      .all(owner_address)
  }

  if (player != '') {
    ual_found = 'yes'
  }

  item_ual_found = 'no'
  if (item_ual && player) {
    item_inventory = JSON.parse(player.inventory)
    item_index = await item_inventory.findIndex(itm => itm.ual == item_ual)
  }

  if (item_index != '') {
    item_ual_found = 'yes'
  }

  if (ual_found == 'yes' && item_ual_found == 'no') {
    console.log(player[0])
    res.render('account', {
      isok_account: 1,
      chat_id: player[0].chat_id,
      ual: player[0].ual,
      username: player[0].username,
      owner_address: player[0].owner_address,
      knowledge: player[0].knowledge,
      inventory: player[0].inventory,
      explores: player[0].explores,
      treks: player[0].treks
    })
    return
  }

  if (ual_found == 'yes' && item_ual_found == 'yes') {
    item = item_inventory[item_index]

    res.render('account', {
      isok_account: 1,
      chat_id: player[0].chat_id,
      ual: player[0].ual,
      username: player[0].username,
      owner_address: player[0].owner_address,
      knowledge: player[0].knowledge,
      inventory: player[0].inventory,
      explores: player[0].explores,
      treks: player[0].treks,
      focus_item: JSON.stringify(item)
    })
    return
  }

  res.render('account')
})

router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  keywords = req.body.keywords
  ual = req.body.ual
  account_ual = req.body.account_ual
  epochs = req.body.epochs
  owner_address = req.body.owner_address
  txn_id = req.body.txn_id
  assertionId = req.body.assertionId
  operationId = req.body.operationId
  type = req.body.type
  action = req.body.action
  assetData = JSON.parse(req.body.assetData)

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)

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
        `INSERT INTO txn_header (owner_address, status, type, keywords,ual,data,epochs,trac_fee,assertionId,operationId,timestamp,action) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
      )
      .run(
        owner_address,
        pub_status,
        type,
        keywords,
        ual,
        JSON.stringify(assetData),
        epochs,
        fee,
        assertionId,
        operationId,
        abs_timestamp,
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

  if (action == 'item creation') {
    const row = await game_db
      .prepare(
        'SELECT * FROM player_header WHERE owner_address = ? COLLATE NOCASE'
      )
      .get(owner_address)

    item_inv = JSON.parse(row.inventory)

    index = await item_inv.findIndex(itm => itm.name == assetData.name)

    console.log(index)
    if (item_inv[index].quantity - 1 == 0) {
      item_inv.splice([index], 1)
    } else {
      item_inv[index]['quantity'] = item_inv[index].quantity - 1
    }

    assetData['ual'] = ual
    item_inv.push(assetData)

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
    //console.log(`Saving Data: ${JSON.stringify(account_data)}`);
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

    await game_db
      .prepare(
        `UPDATE player_header SET inventory = ? WHERE owner_address = ? COLLATE NOCASE`
      )
      .run(JSON.stringify(item_inv), owner_address)
  }

  ual_found = 'no'
  if (ual) {
    player = await game_db
      .prepare('SELECT * FROM player_header WHERE ual = ?')
      .all(ual)
  }

  if (player != '') {
    ual_found = 'yes'
  }

  if (ual_found == 'no' && owner_address) {
    player = await game_db
      .prepare(
        'SELECT * FROM player_header WHERE owner_address = ? COLLATE NOCASE'
      )
      .all(owner_address)
  }

  if (player != '') {
    ual_found = 'yes'
  }

  console.log(player)
  if (ual_found == 'yes') {
    res.render('account', {
      isok_account: 1,
      chat_id: assetData.account.chat_id,
      ual: player[0].ual,
      username: player[0].username,
      owner_address: player[0].owner_address,
      knowledge: player[0].knowledge,
      inventory: player[0].inventory,
      explores: player[0].explores,
      treks: player[0].treks
    })
    return
  }

  res.render('account')
})

module.exports = router

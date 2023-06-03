require('dotenv').config()
var express = require('express')
var router = express.Router()
const mysql = require('mysql')
const otnodedb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'otnodedb'
})

/* GET explore page. */
router.get('/', function (req, res, next) {
  ip = req.socket.remoteAddress

  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  console.log(`Visitor:${ip} landed on the register page.`)
  res.render('register')
})

router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress

  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  tg_id = req.body.tg_id
  network_id = req.body.network_id
  admin_key = req.body.admin_key

    let node;
    query = 'SELECT * FROM alliance_members WHERE network_id = ? COLLATE NOCASE AND admin_key = ?'
    await otnodedb_connection.query(query, [network_id, admin_key],function (error, results, fields) {
      if (error) throw error;
      node = results
    });

  if (node != '') {
    res.render('register', {
      msg: `This node has already been submitted for registry.`
    })
    return
  }

  verification_ask = Math.floor(1000 + Math.random() * 9000)
  verified = 0
  ask = null

    query = 'INSERT INTO alliance_members (admin_key, tg_id, network_id, ask,verification_ask,verified,bot_id) VALUES (?,?,?,?,?,?,?)'
    await otnodedb_connection.query(query, [admin_key, tg_id, network_id, ask, verification_ask, verified, ''],function (error, results, fields) {
      if (error) throw error;
    });

    query = 'SELECT * FROM alliance_members WHERE admin_key = ? COLLATE NOCASE'
    await otnodedb_connection.query(query, [admin_key],function (error, results, fields) {
      if (error) throw error;
      alliance_member = results
    });

  console.log(JSON.stringify(alliance_member))

  console.log(`Visitor:${ip} landed on the alliance dashboard page.`)
  res.render('dashboard', {
    msg: `Nodes are awaiting verification.`,
    alliance_member: JSON.stringify(alliance_member)
  })
})

module.exports = router

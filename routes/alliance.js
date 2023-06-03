require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const mysql = require('mysql')
const otnodedb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'otnodedb'
})

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

    let alliance_members;
    query = 'SELECT * FROM alliance_members WHERE verified = ?'
    // await otnodedb_connection.query(query, [1],function (error, results, fields) {
    //   if (error) throw error;
    //   alliance_members = results
    // });

  console.log(alliance_members)
  console.log(`Visitor:${ip} landed on the alliance page.`)
  res.render('alliance', {
    msg: ``,
    alliance_members: JSON.stringify(alliance_members)
  })
})

module.exports = router

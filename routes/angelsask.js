require('dotenv').config()
var express = require('express')
var router = express.Router()

router.get('/', async function (req, res) {
  res.send(`${process.env.ANGELS_ASK}`)
})

module.exports = router

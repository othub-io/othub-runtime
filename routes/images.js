require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  url_params = purl.parse(req.url, true).query
  src = url_params.src

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  try{
    res.sendFile(`${__dirname}/img/${src}`);
  }catch(e){
    console.log(e)
    res.end('Image Unavailable');
  }
})

module.exports = router

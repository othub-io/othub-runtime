require('dotenv').config()
var express = require('express')
var router = express.Router()

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  data = req.body;
  src = data.src

  try{
    res.sendFile(`${__dirname}/img/${src}`);
  }catch(e){
    console.log(e)
    res.end('Image Unavailable');
  }
})

module.exports = router

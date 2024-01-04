require('dotenv').config()
const express = require('express')
const router = express.Router()
const queryTypes = require('../../util/queryTypes')
const queryDB = queryTypes.queryDB()

router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  data = req.body;
  public_address = data.public_address
  blockchain = "othub_db"
  network = ""

  query = `select * from user_header where public_address = ?`
  params = [public_address]
  user_record = await queryDB
  .getData(query, params, network, blockchain)
    .then(results => {
      return results
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  if (user_record == '') {
    query = 'INSERT INTO user_header values (?,?)'
    nonce = Math.floor(Math.random() * 1000000);
    await queryDB
        .getData(query, [public_address, nonce], network, blockchain)
            .then(results => {
            return results
            })
            .catch(error => {
            console.error('Error retrieving data:', error)
            })

      query = `select * from user_header where public_address = ?`
        params = [public_address]
        user_record = await queryDB
        .getData(query, params, network, blockchain)
            .then(results => {
            return results
            })
            .catch(error => {
            console.error('Error retrieving data:', error)
            })
  }

  res.json({
    user_record: user_record
  })
  return
})

module.exports = router

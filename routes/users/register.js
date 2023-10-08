require('dotenv').config()
var express = require('express')
var router = express.Router()
const mysql = require('mysql')

const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.OTHUB_DB
})

const otp_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.SYNC_DB
})

function executeOTHubQuery (query, params) {
  return new Promise((resolve, reject) => {
    othubdb_connection.query(query, params, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

async function getOTHubData (query, params) {
  try {
    const results = await executeOTHubQuery(query, params)
    return results
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  data = req.body;
  public_address = data.public_address

  query = `select * from user_header where public_address = ?`
  params = [public_address]
  user_record = await getOTHubData(query, params)
    .then(results => {
      return results
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  if (user_record == '') {
    query = 'INSERT INTO user_header values (?,?)'
    nonce = Math.floor(Math.random() * 1000000);
      await othubdb_connection.query(
        query,
        [public_address, nonce],
        function (error, results, fields) {
          if (error) throw error
        }
      )

      query = `select * from user_header where public_address = ?`
        params = [public_address]
        user_record = await getOTHubData(query, params)
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

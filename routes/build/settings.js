require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const mysql = require('mysql')
const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.OTHUB_DB,
  port: '3306',
  insecureAuth: true
})

function executeQuery (query, params) {
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

async function getData (query, params) {
  try {
    const results = await executeQuery(query, params)
    return results
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

function randomWord (length) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; ++i) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  url_params = purl.parse(req.url, true).query
  public_address = url_params.public_address
  app_name = url_params.app_name
  deleteKey = url_params.deleteKey

  console.log(`Visitor:${ip} the dev settings page.`)

  if (deleteKey) {
    query = 'DELETE FROM app_header WHERE api_key = ?'
    await othubdb_connection.query(
      query,
      [deleteKey],
      function (error, results, fields) {
        if (error) throw error
      }
    )

    query = `SELECT * FROM app_header WHERE public_address = ?`
    params = [public_address]
    userRecords = await getData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

    res.json({
      userRecords: userRecords,
      public_address: public_address,
      msg: `SUCCESS! Your API Key was deleted.`
    })
    return
  }

  if (app_name) {
      query = `SELECT * FROM app_header WHERE public_address = ?`
      params = [public_address]
    userRecords = await getData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

    console.log(userRecords)

    if (userRecords != '') {
      if (userRecords.length >= 1) {
        res.json({
          userRecords: userRecords,
          public_address: public_address,
          msg: `FAIL! You may only have 1 api key at a time.`
        })
        return
      }
    }

    api_key = await randomWord(Math.floor(25) + 5)

    query = `INSERT INTO app_header SET api_key = ?, public_address = ?, app_name = ?`
    await othubdb_connection.query(
      query,
      [api_key, public_address, app_name],
      function (error, results, fields) {
        if (error) throw error
      }
    )

    query = `SELECT * FROM app_header WHERE public_address = ?`
    params = [public_address]
    userRecords = await getData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

    res.json({
      userRecords: userRecords,
      public_address: public_address,
      msg: `SUCCESS! A new API Key has been created!`
    })
    return;
  }

  query = `SELECT * FROM app_header WHERE public_address = ?`
  params = [public_address]
  userRecords = await getData(query, params)
    .then(results => {
      //console.log('Query results:', results);
      return results
      // Use the results in your variable or perform further operations
    })
    .catch(error => {
      console.error('Error retrieving data:', error)
    })

  res.json({
    userRecords: userRecords,
    public_address: public_address,
    msg: ` `
  })
  return
})

module.exports = router

require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const mysql = require('mysql')
const otnodedb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.OTHUB_DB,
  port: '3306',
  insecureAuth: true
})

function executeQuery (query, params) {
  return new Promise((resolve, reject) => {
    otnodedb_connection.query(query, params, (error, results) => {
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
  admin_key = url_params.admin_key
  chain_id = url_params.chain_id
  app_name = url_params.app_name
  deleteKey = url_params.deleteKey

  console.log(`Visitor:${ip} the api page.`)

  if (deleteKey) {
    query = 'DELETE FROM user_header WHERE api_key = ?'
    await otnodedb_connection.query(
      query,
      [deleteKey],
      function (error, results, fields) {
        if (error) throw error
      }
    )

    query = `SELECT * FROM user_header WHERE admin_key = ?`
    params = [admin_key]
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
      admin_key: admin_key,
      chain_id: chain_id,
      msg: `SUCCESS! Your API Key was deleted.`
    })
    return
  }

  if (app_name) {
    member = 'no'
    access = 'Basic'

    query = `SELECT * FROM user_header WHERE admin_key = ?`
    params = [admin_key]
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

    query = `SELECT * FROM node_operators WHERE adminKey = ? AND nodeGroup =?`
    params = [admin_key, 'Alliance']
    allianceMember = await getData(query, params)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
      })

    if (allianceMember != '') {
      member = 'yes'
      access = 'Premium'
    }

    if (userRecords != '') {
      if (member == 'no' && userRecords.length >= 1) {
        res.json({
          userRecords: userRecords,
          admin_key: admin_key,
          chain_id: chain_id,
          msg: `FAIL! You may only have 1 api key at a time.`
        })
        return
      }

      if (member == 'yes' && userRecords.length >= 2) {
        res.json({
          userRecords: userRecords,
          admin_key: admin_key,
          chain_id: chain_id,
          msg: `FAIL! You may only have 2 api key at a time.`
        })
        return
      }
    }

    api_key = await randomWord(Math.floor(25) + 5)

    query = `INSERT INTO user_header SET api_key = ?, admin_key = ?, app_name = ?, access = ?`
    await otnodedb_connection.query(
      query,
      [api_key, admin_key, app_name, access],
      function (error, results, fields) {
        if (error) throw error
      }
    )

    query = `SELECT * FROM user_header WHERE admin_key = ?`
    params = [admin_key]
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
      admin_key: admin_key,
      chain_id: chain_id,
      msg: `SUCCESS! A new API Key has been created!`
    })
  }

  query = `SELECT * FROM user_header WHERE admin_key = ?`
  params = [admin_key]
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
  console.log(admin_key)
  res.json({
    userRecords: userRecords,
    admin_key: admin_key,
    msg: ` `
  })
  return
})

module.exports = router

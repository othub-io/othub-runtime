require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const purl = require("url");
const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.SYNC_DB,
});

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

/* GET explore page. */
router.get("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  url_params = purl.parse(req.url, true).query;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  app_search = url_params.app_search
  query = 'select DISTINCT app_name from othubdb.app_header where app_name = ?'
  params = [app_search];
  if(app_search === ''){
    query = 'select * from othubdb.app_header'
    params = [];
  }

  search_result = await getOTHubData(query, params)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  res.json({
    search_result: search_result
  });
});

module.exports = router;

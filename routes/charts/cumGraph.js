require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const otp_connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.SYNC_DB,
  });
  
  const otp_testnet_connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.SYNC_DB_TESTNET,
  });
  
  function executeOTPQuery(query, params,network ) {
    return new Promise((resolve, reject) => {
      if (network == "Origintrail Parachain Testnet") {
        otp_testnet_connection.query(query, params, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
      }
      if (network == "Origintrail Parachain Mainnet") {
        otp_connection.query(query, params, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
      }
    });
  }

  async function getOTPData(query, params, network) {
    try {
      const results = await executeOTPQuery(query, params, network);
      return results;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }

/* GET explore page. */
router.post("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  timeframe = req.body.timeframe;
  network = req.body.network;

  console.log(timeframe)
  console.log(network)

  limit = 5000
  if (timeframe == "24h") {
    limit = 1
  }
  if (timeframe == "7d") {
    limit = 7
  }
  if (timeframe == "30d") {
    limit = 30
  }
  if (timeframe == "1y") {
    limit = 365
  }

  query = `select * from v_chart_cum_total order by date LIMIT ${limit}`;
  params = [];
  data = await getOTPData(query, params, network)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  res.json({
    chart_data: data,
  });
});

module.exports = router;

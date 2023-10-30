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
    if (network === "Origintrail Parachain Testnet") {
      otp_testnet_connection.query(query, params, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
    }
    if (network === "Origintrail Parachain Mainnet") {
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

  query = `SELECT date, totalPubs, totalTracSpent, avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
  FROM v_pubs_stats_monthly
  order by date`;
  if (timeframe == "24h") {
    query = `SELECT datetime as date, totalPubs, totalTracSpent, avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats_hourly
    where datetime >= (select DATE_ADD(block_ts, interval -24 HOUR) as t from v_sys_staging_date)
    order by datetime`
  }
  if (timeframe == "7d") {
    query = `SELECT datetime as date, totalPubs, totalTracSpent, avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats_hourly
    where datetime >= (select DATE_ADD(block_ts, interval -168 HOUR) as t from v_sys_staging_date)
    order by datetime`
  }
  if (timeframe == "30d") {
    query = `SELECT date, totalPubs, totalTracSpent , avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats 
    where date >= (select cast(DATE_ADD(block_ts, interval -1 MONTH) as date) as t from v_sys_staging_date)
    order by date`
  }
  if (timeframe == "6m") {
    query = `SELECT date, totalPubs, totalTracSpent , avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats 
    where date >= (select cast(DATE_ADD(block_ts, interval -6 MONTH) as date) as t from v_sys_staging_date)
    order by date`
  }
  if (timeframe == "1y") {
    query = `SELECT date, totalPubs, totalTracSpent , avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats_monthly 
    where date >= (select cast(DATE_ADD(block_ts, interval -12 MONTH) as date) as t from v_sys_staging_date)
    order by date`
  }

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

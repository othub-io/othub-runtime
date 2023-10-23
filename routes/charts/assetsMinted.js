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

function executeOTPQuery(query, params) {
  return new Promise((resolve, reject) => {
    otp_connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function getOTPData(query, params) {
  try {
    const results = await executeOTPQuery(query, params);
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
  console.log(timeframe)
  query = `SELECT * FROM v_pubs_stats`;
  order_by = `date`
  if (timeframe == "24h") {
    query = `SELECT * FROM v_pubs_stats_last24h`;
    order_by = `datetime`
  }
  if (timeframe == "7d") {
    query = `SELECT * FROM v_pubs_stats_last7d`;
    order_by = `datetime`
  }
  if (timeframe == "30d") {
    query = `SELECT * FROM v_pubs_stats_last30d`;
    order_by = `datetime`
  }

  query = `${query} where ${order_by} != (select block_date from v_sys_staging_date) order by ${order_by}`;
  params = [];
  data = await getOTPData(query, params)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

    console.log(data)
  res.json({
    chart_data: data,
  });
});

module.exports = router;

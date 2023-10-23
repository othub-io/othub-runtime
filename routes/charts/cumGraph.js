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
  trac_spent_query = `SELECT date, SUM(totalTracSpent) OVER (ORDER BY date ASC) AS cumulativeTotalTracSpent FROM v_pubs_stats ORDER BY date ASC`;
  mints_query = `SELECT date, SUM(totalPubs) OVER (ORDER BY date ASC) AS cumulativePubs FROM v_pubs_stats ORDER BY date ASC`;
  payouts_query = `SELECT date, SUM(totalTracSpent) OVER (ORDER BY date ASC) AS cumulativeTotalTracSpent FROM v_pubs_stats ORDER BY date ASC`;

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

  params = [];
  const cumulativeTracSpent = await getOTPData(trac_spent_query, params)
  .then((results) => {
    //console.log('Query results:', results);
    return results;
    // Use the results in your variable or perform further operations
  })
  .catch((error) => {
    console.error("Error retrieving data:", error);
  });

  const cumulativeMints = await getOTPData(mints_query, params)
  .then((results) => {
    //console.log('Query results:', results);
    return results;
    // Use the results in your variable or perform further operations
  })
  .catch((error) => {
    console.error("Error retrieving data:", error);
  });

  const cumulativePayouts = await getOTPData(payouts_query, params)
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

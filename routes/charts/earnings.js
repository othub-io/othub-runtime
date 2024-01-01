require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require('../../util/queryTypes')
const queryDB = queryTypes.queryDB()

/* GET explore page. */
router.post("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  timeframe = req.body.timeframe;
  network = req.body.network;
  blockchain = req.body.blockchain;

  query = `select * from v_chart_earnings_payouts_monthly`;
  if (timeframe == "24h") {
    query = `SELECT datetime as date, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
    FROM (
        SELECT datetime, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
        FROM v_chart_earnings_payouts_hourly
        ORDER BY datetime DESC
        LIMIT 24
    ) AS records
    ORDER BY datetime ASC`;
  }
  if (timeframe == "7d") {
    query = `SELECT datetime as date, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
    FROM (
        SELECT datetime, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
        FROM v_chart_earnings_payouts_hourly
        ORDER BY datetime DESC
        LIMIT 168
    ) AS records
    ORDER BY datetime ASC`;
  }
  if (timeframe == "30d") {
    query = `SELECT date, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
    FROM (
        SELECT date, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
        FROM v_chart_earnings_payouts_daily
        ORDER BY date DESC
        LIMIT 30
    ) AS records
    ORDER BY date ASC`;
  }
  if (timeframe == "6m") {
    query = `SELECT date, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
    FROM (
        SELECT date, estimatedEarnings1stEpochOnly, estimatedEarnings2plusEpochs, payouts
        FROM v_chart_earnings_payouts_daily
        ORDER BY date DESC
        LIMIT 182
    ) AS records
    ORDER BY date ASC`;
  }
  if (timeframe == "1y") {
    query = `select * from v_chart_earnings_payouts_monthly LIMIT 12`
  }

  params = [];
  data = await queryDB.getData(query, params, network, blockchain)
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

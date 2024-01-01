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

  nodeId = req.body.nodeId;
  public_address = req.body.public_address;
  timeframe = req.body.timeframe;
  network = req.body.network;
  blockchain = req.body.blockchain;
  limit = "1000";
  conditions = [];
  params = nodeId

  ques = ""
  for(const nodeid of nodeId){
    ques = ques +"?,"
  }
  ques = ques.substring(0, ques.length - 1);

  query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts FROM v_nodes_stats_monthly WHERE nodeId in (${ques}) order by date asc`;

  if (timeframe === "24h") {
    query = `SELECT tokenName,datetime as date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts FROM v_nodes_stats_hourly_7d WHERE date >= (select cast(DATE_ADD(block_ts, interval -24 HOUR) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
  }

  if (timeframe === "7d") {
    query = `SELECT tokenName,datetime as date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts FROM v_nodes_stats_hourly_7d WHERE date >= (select cast(DATE_ADD(block_ts, interval -168 HOUR) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
  }

  if (timeframe === "30d") {
    query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts FROM v_nodes_stats WHERE date >= (select cast(DATE_ADD(block_ts, interval -1 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
  }

  if (timeframe === "6m") {
    query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts FROM v_nodes_stats WHERE date >= (select cast(DATE_ADD(block_ts, interval -6 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
  }

  if (timeframe === "1y") {
    query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts FROM v_nodes_stats_monthly WHERE date >= (select cast(DATE_ADD(block_ts, interval -12 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
  }

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

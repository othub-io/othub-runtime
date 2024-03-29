require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
  timeframe = req.body.timeframe;
  const node = req.body.node;
  let blockchain = node.blockchain_name;
  let network = "";

  query = `SELECT tokenName,date,shareValueCurrent,shareValueFuture,tokenName,tokenSymbol FROM v_nodes_stats_daily WHERE nodeId in (?) order by date asc`;

//   if (timeframe === "24h") {
//     query = `SELECT tokenName,datetime as date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_hourly_7d WHERE date >= (select cast(DATE_ADD(block_ts, interval -24 HOUR) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
//   }

//   if (timeframe === "7d") {
//     query = `SELECT tokenName,datetime as date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_hourly_7d WHERE date >= (select cast(DATE_ADD(block_ts, interval -168 HOUR) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
//   }

//   if (timeframe === "30d") {
//     query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_daily WHERE date >= (select cast(DATE_ADD(block_ts, interval -1 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
//   }

//   if (timeframe === "6m") {
//     query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_daily WHERE date >= (select cast(DATE_ADD(block_ts, interval -6 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
//   }

//   if (timeframe === "1y") {
//     query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_monthly WHERE date >= (select cast(DATE_ADD(block_ts, interval -12 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
//   }

  params = [node.nodeId];
  data = await queryDB
    .getData(query, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  if (data.length > 0) {
    chain_data = {
      blockchain_name: blockchain,
      data: data,
    };

    console.log(chain_data)
    res.json({
      chart_data: chain_data,
    });
  }
});

module.exports = router;

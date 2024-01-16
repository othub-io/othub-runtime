require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
  public_address = req.body.public_address;
  timeframe = req.body.timeframe;
  const nodes = req.body.nodes;
  const uniqueBlockchains = [];
  let blockchains = req.body.blockchain;

  if (!blockchains) {
    blockchains = nodes
      .map((node) => node.blockchain_name)
      .filter((blockchainName) => {
        if (!uniqueBlockchains.includes(blockchainName)) {
          uniqueBlockchains.push(blockchainName);
          return true;
        }
        return false;
      });
  } else {
    blockchains = [blockchains];
  }

  network = "";

  limit = "1000";
  conditions = [];

  let stats_data = [];
  for (let blockchain of blockchains) {
    let blockchain_ids = nodes
      .filter((node) => node.blockchain_name === blockchain)
      .map((node) => node.blockchain_id);

    let params = nodes
      .filter((node) => node.blockchain_name === blockchain)
      .map((node) => node.nodeId);

    if (params.length > 0) {
      ques = "";
      for (const nodeid of params) {
        ques = ques + "?,";
      }
      ques = ques.substring(0, ques.length - 1);
    }

    query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_monthly WHERE nodeId in (${ques}) order by date asc`;

    if (timeframe === "24h") {
      query = `SELECT tokenName,datetime as date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_hourly_7d WHERE date >= (select cast(DATE_ADD(block_ts, interval -24 HOUR) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
    }

    if (timeframe === "7d") {
      query = `SELECT tokenName,datetime as date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_hourly_7d WHERE date >= (select cast(DATE_ADD(block_ts, interval -168 HOUR) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
    }

    if (timeframe === "30d") {
      query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_daily WHERE date >= (select cast(DATE_ADD(block_ts, interval -1 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
    }

    if (timeframe === "6m") {
      query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_daily WHERE date >= (select cast(DATE_ADD(block_ts, interval -6 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
    }

    if (timeframe === "1y") {
      query = `SELECT tokenName,date, pubsCommited,pubsCommited1stEpochOnly,cumulativePubsCommited,cumulativePubsCommited1stEpochOnly,estimatedEarnings,estimatedEarnings1stEpochOnly,cumulativeEstimatedEarnings,cumulativeEstimatedEarnings1stEpochOnly,payouts,cumulativePayouts,nodeStake FROM v_nodes_stats_monthly WHERE date >= (select cast(DATE_ADD(block_ts, interval -12 MONTH) as date) as t from v_sys_staging_date) AND nodeId in (?) order by date asc`;
    }

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

    chain_data = {
      blockchain_name: blockchain,
      blockchain_id: blockchain_ids[0],
      data: data,
    };

    stats_data.push(chain_data);
  }

  res.json({
    chart_data: stats_data,
  });
});

module.exports = router;

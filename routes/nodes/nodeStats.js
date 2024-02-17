require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
  timeframe = req.body.timeframe;
  const nodeId = req.body.nodeId;
  let blockchain = req.body.blockchain;
  let network = "";
  
  params = [nodeId];
  query = `select nodeStake from v_nodes where nodeStake >= 50000 AND nodeId in (?)`;
  node_res = await queryDB
    .getData(query, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  query = `select * from v_nodes_stats_daily where date = (select block_date from v_sys_staging_date) and nodeId in (?)`;
  nodes_stats_daily = await queryDB
    .getData(query, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  query = `select * from v_nodes_stats_last24h where nodeId in (?)`;
  nodes_stats_last24h= await queryDB
    .getData(query, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  stats_data = {
    blockchain_name: blockchain,
    nodes: node_res.length,
    totalStake: node_res[0].nodeStake,
    pubs_commited_24h: nodes_stats_last24h[0].pubsCommited,
    pubs_commited: nodes_stats_daily[0].cumulativePubsCommited,
    earnings_24h: nodes_stats_last24h[0].estimatedEarnings,
    earnings: nodes_stats_daily[0].cumulativeEstimatedEarnings,
    payouts_24h: nodes_stats_last24h[0].cumulativePayouts,
    payouts: nodes_stats_daily[0].cumulativePayouts,
  };

  res.json(stats_data);
});

module.exports = router;

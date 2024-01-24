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

  if (!blockchain) {
    blockchain = "othub_db";
    query = `select chain_name,chain_id from blockchains where environment = ?`;
    params = [network];
    network = "";
    blockchains = await queryDB
      .getData(query, params, network, blockchain)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  } else {
    query = `select chain_name,chain_id from blockchains where environment = ? and chain_name = ?`;
    params = [network, blockchain];
    blockchain = "othub_db";
    network = "";
    blockchains = await queryDB
      .getData(query, params, network, blockchain)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }

  query = `SELECT date, combinedNodesStake,nodesWithMoreThan50kStake FROM v_nodes_stats_grouped_monthly order by date asc`;
  if (timeframe == "30d") {
    query = `SELECT date, combinedNodesStake,nodesWithMoreThan50kStake
    FROM (
        SELECT date, combinedNodesStake,nodesWithMoreThan50kStake
        FROM v_nodes_stats_grouped_daily 
        order by date desc 
        LIMIT 30
    ) AS stake
    ORDER BY date asc;`;
  }
  if (timeframe == "6m") {
    query = `SELECT date, combinedNodesStake,nodesWithMoreThan50kStake
    FROM (
        SELECT date, combinedNodesStake,nodesWithMoreThan50kStake
        FROM v_nodes_stats_grouped_daily 
        order by date desc 
        LIMIT 182
    ) AS stake
    ORDER BY date asc;`;
  }
  if (timeframe == "1y") {
    query = `SELECT date, combinedNodesStake, nodesWithMoreThan50kStake FROM v_nodes_stats_grouped_monthly order by date asc LIMIT 365`
  }

  let stats_data = [];
  for (const blockchain of blockchains) {
    params = [];
    data = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    chain_data = {
      blockchain_name: blockchain.chain_name,
      blockchain_id: blockchain.chain_id,
      chart_data: data,
    };

    stats_data.push(chain_data);
  }

  res.json({
    chart_data: stats_data,
  });
});

module.exports = router;

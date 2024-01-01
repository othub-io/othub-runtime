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

  query = `SELECT date, nodesStake, nodesWithMoreThan50kStake, nodesWithLessThan50kStake FROM v_chart_node_stake_count_monthly order by date asc`;
  if (timeframe == "30d") {
    query = `SELECT date, nodesStake, nodesWithMoreThan50kStake, nodesWithLessThan50kStake
    FROM (
        SELECT date, nodesStake, nodesWithMoreThan50kStake, nodesWithLessThan50kStake 
        FROM v_chart_node_stake_count_daily 
        order by date desc 
        LIMIT 30
    ) AS stake
    ORDER BY date asc;`;
  }
  if (timeframe == "6m") {
    query = `SELECT date, nodesStake, nodesWithMoreThan50kStake, nodesWithLessThan50kStake
    FROM (
        SELECT date, nodesStake, nodesWithMoreThan50kStake, nodesWithLessThan50kStake 
        FROM v_chart_node_stake_count_daily 
        order by date desc 
        LIMIT 182
    ) AS stake
    ORDER BY date asc;`;
  }
  if (timeframe == "1y") {
    query = `SELECT date, nodesStake, nodesWithMoreThan50kStake, nodesWithLessThan50kStake FROM v_chart_node_stake_count_monthly order by date asc LIMIT 365`
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

require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../../util/queryTypes");
const queryDB = queryTypes.queryDB();

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

  query = `SELECT date, totalPubs, totalTracSpent, avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
  FROM v_pubs_stats_monthly
  order by date`;
  if (timeframe == "24h") {
    query = `SELECT datetime as date, totalPubs, totalTracSpent, avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats_hourly
    where datetime >= (select DATE_ADD(block_ts, interval -24 HOUR) as t from v_sys_staging_date)
    order by datetime`;
  }
  if (timeframe == "7d") {
    query = `SELECT datetime as date, totalPubs, totalTracSpent, avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats_hourly
    where datetime >= (select DATE_ADD(block_ts, interval -168 HOUR) as t from v_sys_staging_date)
    order by datetime`;
  }
  if (timeframe == "30d") {
    query = `SELECT date, totalPubs, totalTracSpent , avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats 
    where date >= (select cast(DATE_ADD(block_ts, interval -1 MONTH) as date) as t from v_sys_staging_date)
    order by date`;
  }
  if (timeframe == "6m") {
    query = `SELECT date, totalPubs, totalTracSpent , avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats 
    where date >= (select cast(DATE_ADD(block_ts, interval -6 MONTH) as date) as t from v_sys_staging_date)
    order by date`;
  }
  if (timeframe == "1y") {
    query = `SELECT date, totalPubs, totalTracSpent , avgPubSize, avgPubPrice, avgBid, privatePubsPercentage, avgEpochsNumber
    FROM v_pubs_stats_monthly 
    where date >= (select cast(DATE_ADD(block_ts, interval -12 MONTH) as date) as t from v_sys_staging_date)
    order by date`;
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

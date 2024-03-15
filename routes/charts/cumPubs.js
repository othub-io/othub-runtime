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
    query = `select * from blockchains where environment = ?`;
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
  }else{
    query = `select * from blockchains where environment = ? and chain_name = ?`;
    params = [network,blockchain];
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

  limit = 5000;
  if (timeframe == "24h") {
    limit = 1;
  }
  if (timeframe == "7d") {
    limit = 7;
  }
  if (timeframe == "30d") {
    limit = 30;
  }
  if (timeframe == "1y") {
    limit = 365;
  }

  let chart_data = [];

  network = req.body.network;
  query = `select date,cumulativePubs,cumulativeTotalTracSpent from v_pubs_stats_monthly order by date`;
  params = [];
  blockchain = ""
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
    blockchain_name: "Total",
    blockchain_id: "99999",
    cum_total: data,
  };

  chart_data.push(chain_data);

  network = "";
  for (const blockchain of blockchains) {
    query = `select date,cumulativePubs,cumulativeTotalTracSpent from v_pubs_stats_monthly order by date`;
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
      cum_total: data,
    };

    chart_data.push(chain_data);
  }

  res.json({
    chart_data: chart_data,
  });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require('../util/queryTypes')
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

  console.log(network)
  console.log(blockchain)
  if (blockchain) {
    network = "";
  }

  limit = "200";
  conditions = [];
  params = []

  query = `select signer,UAL,datetime,tokenId,transactionHash,eventName,eventValue1,chain_id from v_pubs_activity_last1min UNION ALL select tokenSymbol,UAL,datetime,tokenId,transactionHash,eventName,eventValue1,chain_id from v_nodes_activity_last1min WHERE eventName != 'StakeIncreased' order by datetime desc LIMIT ${limit}`;

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
    activity_data: data,
  });
});

module.exports = router;

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

  nodeId = req.body.nodeId;
  public_address = req.body.public_address;
  timeframe = req.body.timeframe;
  network = "";
  blockchain = "Origintrail Parachain Mainnet";
  limit = "200";
  conditions = [];
  params = []

  query = `select signer,UAL,datetime,tokenId,transactionHash,eventName,eventValue1 from v_pubs_activity_last1min WHERE transactionHash != '' AND transactionHash is not null AND signer != '' AND signer is not null UNION ALL select tokenSymbol,UAL,datetime,tokenId,transactionHash,eventName,eventValue1 from v_nodes_activity_last1min WHERE eventName != 'StakeIncreased' AND transactionHash != '' AND transactionHash is not null order by datetime desc LIMIT ${limit}`;

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

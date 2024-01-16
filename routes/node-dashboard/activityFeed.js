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

    query = `select signer,UAL,datetime,tokenId,transactionHash,eventName,eventValue1,chain_id from v_pubs_activity_last1min UNION ALL select tokenSymbol,UAL,datetime,tokenId,transactionHash,eventName,eventValue1,chain_id from v_nodes_activity_last24h WHERE nodeId in (${ques}) AND eventName != 'StakeIncreased' order by datetime desc LIMIT ${limit}`

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

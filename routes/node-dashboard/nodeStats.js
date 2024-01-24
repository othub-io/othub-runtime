require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
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

      query = `select nodeStake from v_nodes where nodeStake >= 50000 AND nodeId in (${ques})`;
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

      query = `select sum(pubsCommited) as 'pubsCommited',sum(cumulativePubsCommited) as 'cumulativePubsCommited',sum(estimatedEarnings) as 'estimatedEarnings',sum(cumulativeEstimatedEarnings) as 'cumulativeEstimatedEarnings',sum(payouts) as 'payouts',sum(cumulativePayouts) as 'cumulativePayouts' from v_nodes_stats_daily where date = (select block_date from v_sys_staging_date) and nodeId in (${ques})`;
      nodes_stats = await queryDB
        .getData(query, params, network, blockchain)
        .then((results) => {
          //console.log('Query results:', results);
          return results;
          // Use the results in your variable or perform further operations
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

      totalStake = 0;
      for (const node of node_res) {
        totalStake = totalStake + Number(node.nodeStake);
      }

      chain_data = {
        blockchain_name: blockchain,
        blockchain_id: blockchain_ids[0],
        nodes: node_res.length,
        totalStake: totalStake,
        pubs_commited_24h: nodes_stats[0].pubsCommited,
        pubs_commited: nodes_stats[0].cumulativePubsCommited,
        earnings_24h: nodes_stats[0].estimatedEarnings,
        earnings: nodes_stats[0].cumulativeEstimatedEarnings,
        payouts_24h: nodes_stats[0].payouts,
        payouts: nodes_stats[0].cumulativePayouts,
      };

      stats_data.push(chain_data);
    }
  }

  res.json(stats_data);
});

module.exports = router;

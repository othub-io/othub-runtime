require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../util/queryTypes");
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
  for (let node of nodes) {
    let blockchain = node.blockchain_name
    let blockchain_id = node.blockchain_id

    query = `select tokenName,nodeStake from v_nodes where nodeStake >= 50000 AND nodeId in (?)`;
      node_res = await queryDB
        .getData(query, node.nodeId, network, blockchain)
        .then((results) => {
          //console.log('Query results:', results);
          return results;
          // Use the results in your variable or perform further operations
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

      query = `select sum(pubsCommited) as 'pubsCommited',sum(cumulativePubsCommited) as 'cumulativePubsCommited',sum(estimatedEarnings) as 'estimatedEarnings',sum(cumulativeEstimatedEarnings) as 'cumulativeEstimatedEarnings',sum(payouts) as 'payouts',sum(cumulativePayouts) as 'cumulativePayouts' from v_nodes_stats_daily where date = (select block_date from v_sys_staging_date) and nodeId in (?)`;
      nodes_stats = await queryDB
        .getData(query, node.nodeId, network, blockchain)
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
        blockchain_id: blockchain_id,
        nodes: node_res.length,
        tokenName: node_res[0].tokenName,
        m_wallet: node.m_wallet,
        o_wallet: node.o_wallet,
        totalStake: totalStake,
        op_fee: node.op_fee,
        pubs_commited_24h: nodes_stats[0].pubsCommited,
        pubs_commited: nodes_stats[0].cumulativePubsCommited,
        earnings_24h: nodes_stats[0].estimatedEarnings,
        earnings: nodes_stats[0].cumulativeEstimatedEarnings,
        payouts_24h: nodes_stats[0].payouts,
        payouts: nodes_stats[0].cumulativePayouts,
      };

      stats_data.push(chain_data);
  }

  res.json(stats_data);
});

module.exports = router;

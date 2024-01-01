require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
  network = req.body.network;
  blockchain = "othub_db";

  query = `select * from blockchains where environment = ?`;
  params = [network];
  network = ""
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

  let stats_data = [];
  for (const blockchain of blockchains) {
    query = `select count(*) from v_nodes where nodeStake >= 50000`;
    params = [];
    console.log(blockchain.chain_name)
    node_count = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    query = `select count(*) as count from v_pubs order by block_date`;
    pub_count = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    query = `select * from v_pubs_stats 
        where date != (select block_date from v_sys_staging_date)
        order by date`;
    pubs_stats = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    query = `select * from v_pubs_stats_last24h order by datetime`;
    pubs_stats_last24h = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    totalTracSpent = 0;
    for (i = 0; i < pubs_stats.length; i++) {
      pub = pubs_stats[i];
      totalTracSpent = totalTracSpent + Number(pub.totalTracSpent);
    }

    totalStake = 0;
    for (i = 0; i < Number(node_count[0].count); i++) {
      node = nodes[i];
      totalStake = totalStake + Number(node.nodeStake);
    }

    chain_data = {
      blockchain_name: blockchain.chain_name,
      blockchain_id: blockchain.chain_id,
      nodes: node_count[0].count,
      pubs_stats: pubs_stats,
      pubs_stats_last24h: pubs_stats_last24h,
      pub_count: pub_count[0].count,
      totalTracSpent: totalTracSpent,
      totalStake: totalStake,
    };

    stats_data.push(chain_data);
  }

  res.json(stats_data);
});

module.exports = router;

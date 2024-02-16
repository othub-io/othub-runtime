require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
  let network = req.body.network;
  let blockchain = req.body.blockchain;

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
  }else{
    query = `select chain_name,chain_id from blockchains where environment = ? and chain_name = ?`;
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

  let stats_data = [];

  for (const blockchain of blockchains) {
    query = `select nodeStake from v_nodes where nodeStake >= 50000`;
    params = [];
    let nodes = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

      query = `select sum(totalPubs) as count from v_pubs_stats_daily`;
      let pub_count = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    // query = `select totalTracSpent from v_pubs_stats_daily
    //     WHERE date < (SELECT MAX(date) FROM v_pubs_stats_daily)
    //     order by date`;
    // let pubs_stats = await queryDB
    //   .getData(query, params, network, blockchain.chain_name)
    //   .then((results) => {
    //     //console.log('Query results:', results);
    //     return results;
    //     // Use the results in your variable or perform further operations
    //   })
    //   .catch((error) => {
    //     console.error("Error retrieving data:", error);
    //   });

    query = `select totalPubs,totalTracSpent from v_pubs_stats_last24h order by datetime`;
    let pubs_stats_last24h = await queryDB
      .getData(query, params, network, blockchain.chain_name)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    query = `select totalTracSpent from v_pubs_stats_total`;
    let totalTracSpent = await queryDB
    .getData(query, params, network, blockchain.chain_name)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

    let totalStake = 0;
    for (const node of nodes) {
      totalStake = totalStake + Number(node.nodeStake);
    }

    chain_data = {
      blockchain_name: blockchain.chain_name,
      blockchain_id: blockchain.chain_id,
      nodes: nodes.length,
      pubs_stats_last24h: pubs_stats_last24h,
      pub_count: pub_count[0].count,
      totalTracSpent: totalTracSpent[0].totalTracSpent,
      totalStake: totalStake,
    };

    stats_data.push(chain_data);
  }

  res.json(stats_data);
});

module.exports = router;

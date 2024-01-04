require('dotenv').config()
const express = require('express')
const router = express.Router()
const queryTypes = require('../util/queryTypes')
const queryDB = queryTypes.queryDB()

/* GET explore page. */
router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  network = req.body.network;
  blockchain = req.body.blockchain;
  order_by = req.body.order_by;

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

  let nodes_data = [];
  for (const blockchain of blockchains) {
    query = `select * from v_nodes where nodeStake >= 50000 AND nodeId != '0' order by ${order_by}`
    params = []
    nodes = await queryDB.getData(query, params, network, blockchain.chain_name)
      .then(results => {
        //console.log('Query results:', results);
        return results
        // Use the results in your variable or perform further operations
      })
      .catch(error => {
        console.error('Error retrieving data:', error)
    })

    node_data = {
      blockchain_name: blockchain.chain_name,
      blockchain_id: blockchain.chain_id,
      nodes: nodes
    };

    nodes_data.push(node_data);
  }

  res.json({
    nodes: nodes_data,
    msg: ``
  })
})

module.exports = router
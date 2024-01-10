require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require('../../util/queryTypes')
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
  network = req.body.network;
  blockchain = req.body.blockchain;
  limit = "1000";
  conditions = [];
  params = nodeId

  ques = ""
  for(const nodeid of nodeId){
    ques = ques +"?,"
  }
  ques = ques.substring(0, ques.length - 1);

  query = `SELECT nodeStake from v_nodes WHERE nodeId in (${ques})`;

  let node_data = []
  for(const blockchain of nodeId){
    data = await queryDB.getData(query, params, network, blockchain.chain_name)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

    node_info = {
      blockchain_name: blockchain.chain_name,
      blockchain_id: blockchain.chain_id,
      chart_data: data,
    };

    node_data.push(node_info)
  }

  res.json({
    chart_data: node_data,
  });
});

module.exports = router;

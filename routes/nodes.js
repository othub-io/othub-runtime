require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  network = req.body.network;
  blockchain = req.body.blockchain;

  if(blockchain){
    network = ""
  }

  order_by = "nodeStake"
  if(req.body.order_by){
    order_by = req.body.order_by;
  }

  query = `select * from v_nodes where nodeStake >= 50000 AND nodeId != '0' order by ${order_by} asc`;
  let params = [];
  nodes = await queryDB
    .getData(query, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

    network = ""
    let node_list = []
    for(const node of nodes){
      blockchain = node.chainName
      query = `select estimatedEarnings,cumulativePayouts from v_nodes_stats_latest where nodeId = ?`;
      params = [node.nodeId];
      dkg_node = await queryDB
        .getData(query, params, network, blockchain)
        .then((results) => {
          //console.log('Query results:', results);
          return results;
          // Use the results in your variable or perform further operations
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

      //let after_fee_earnings = dkg_node[0].estimatedEarnings - (dkg_node[0].estimatedEarnings * (node.nodeOperatorFee / 100))
      //let shareValue = (node.nodeStake + after_fee_earnings - dkg_node[0].cumulativePayouts) / node.nodeStake
      
      node_obj = {
        chainId: node.chainId,
        chainName: node.chainName,
        nodeId: node.nodeId,
        tokenName: node.tokenName,
        tokenSymbol: node.tokenSymbol,
        nodeStake: node.nodeStake,
        nodeOperatorFee: node.nodeOperatorFee,
        nodeAsk: node.nodeAsk,
        nodeAgeDays:node.nodeAgeDays,
        shareValue: 1
      }

      node_list.push(node_obj)
    }

  res.json({
    nodes: node_list,
    msg: ``,
  });
});

module.exports = router;

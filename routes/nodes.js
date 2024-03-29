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

  let network = req.body.network;
  let blockchain = req.body.blockchain;
  let node_name = req.node_name;

  if (blockchain) {
    network = "";
  }

  order_by = "nodeStake";
  if (req.body.order_by) {
    order_by = req.body.order_by;
  }

  let query = `select * from v_nodes`;
  let conditions = [];
  let params = [];

  conditions.push(`nodeStake >= ?`);
  params.push(50000);

  conditions.push(`nodeId != ?`);
  params.push(0);

  if (node_name) {
    conditions.push(`tokenName != ?`);
    params.push(0);
  }

  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  query = query + " " + whereClause + ` order by ${order_by} asc`;

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

  network = "";
  let node_list = [];
  for (const node of nodes) {
    blockchain = node.chainName;
    query = `select shareValueCurrent from v_nodes_stats_latest where nodeId = ?`;
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

    node_obj = {
      chainId: node.chainId,
      chainName: node.chainName,
      nodeId: node.nodeId,
      tokenName: node.tokenName,
      tokenSymbol: node.tokenSymbol,
      nodeStake: node.nodeStake,
      nodeOperatorFee: node.nodeOperatorFee,
      nodeAsk: node.nodeAsk,
      nodeAgeDays: node.nodeAgeDays,
      shareValueCurrent: dkg_node[0].shareValueCurrent,
    };

    node_list.push(node_obj);
  }

  res.json({
    nodes: node_list,
    msg: ``,
  });
});

module.exports = router;

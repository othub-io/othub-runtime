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
  params = [];
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


  res.json({
    nodes: nodes,
    msg: ``,
  });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require('../util/queryTypes')
const queryDB = queryTypes.queryDB()


/* GET explore page. */
router.post("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  data = req.body
  network = req.body.network;
  blockchain = req.body.blockchain;

  if (blockchain) {
    network = ""
  }

  query = `select * from v_pubs`;
  conditions = [];
  params = [];

  limit = 100;
  if (data.limit && Number(data.limit)) {
    limit = data.limit;
  }

  if (data.nodeId && Number(data.nodeId)) {
    nodeId = Number(data.nodeId);
    conditions.push(`winners like ? OR winners like ? OR winners like ?`);

    nodeId = `%"${nodeId},%`;
    params.push(nodeId);

    nodeId = `%,${nodeId},%`;
    params.push(nodeId);

    nodeId = `%,${nodeId}"%`;
    params.push(nodeId);
  }

  if (data.creator) {
    conditions.push(`publisher = ?`);
    params.push(data.creator);
  }

  order_by = "block_ts_hour";
  if (data.order) {
    order_by = data.order;
  }

  if (data.ual) {
    conditions.push(`ual = ?`);
    params.push(data.ual);
  }

  if (network == '') {
    network = 'Origintrail Parachain Mainnet'
  }


  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery =
    query + " " + whereClause + `order by ${order_by} desc LIMIT ${limit}`;

  v_pubs = "";
  console.log(sqlQuery);
  v_pubs = await queryDB.getData(sqlQuery, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  if (data.ual) {
    console.log(v_pubs);
  }

  res.json({
    v_pubs: v_pubs,
    msg: ``,
  });
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const web3passport = require("../../auth/passport");
const queryTypes = require("../../util/queryTypes");
const queryDB = queryTypes.queryDB();
const keccak256 = require("keccak256");

/* GET explore page. */
router.post(
  "/",
  web3passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
      ip = req.headers["x-forwarded-for"];
    }

    public_address = req.user[0].public_address;
    network = req.body.network;
    blockchain = req.body.blockchain;

    nodes = [];
    operatorRecord = [];

    keccak256hash = keccak256(public_address).toString("hex");
    keccak256hash = "0x" + keccak256hash;
    like_keccak256hash = "%" + keccak256hash + "%";

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
    } else {
      query = `select chain_name,chain_id from blockchains where environment = ? and chain_name = ?`;
      params = [network, blockchain];
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

    query = `select nodeId,tokenName from v_nodes where current_adminWallet_hashes like ?`;
    params = [like_keccak256hash];
    let node_list = []
    for (const blockchain of blockchains) {
      nodes = await queryDB
        .getData(query, params, network, blockchain.chain_name)
        .then((results) => {
          return results;
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

        node = {
          blockchain_name: blockchain.chain_name,
          blockchain_id: blockchain.chain_id,
          nodes: nodes
        }

        node_list.push(node)
    }

    query = `select * from node_operators where public_address = ?`;
    params = [public_address];
    blockchain = "othub_db";
    network = "";
    operatorRecord = await queryDB
      .getData(query, params, network, blockchain)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    res.json({
      nodes: node_list,
      operatorRecord: operatorRecord,
      msg: ``,
    });
  }
);

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const web3passport = require("../../auth/passport");
const queryTypes = require('../../util/queryTypes')
const queryDB = queryTypes.queryDB()
const keccak256 = require("keccak256");

/* GET explore page. */
router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
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

    query = `select nodeId,tokenName from v_nodes where current_adminWallet_hashes like ?`;
    params = [like_keccak256hash];
    nodes = await queryDB.getData(query, params, network, blockchain)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    query = `select * from node_operators where public_address = ?`;
    params = [public_address];
    blockchain = "othub_db"
    network = ""
    operatorRecord = await queryDB.getData(query, params, network, blockchain)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    res.json({
      nodes: nodes,
      operatorRecord: operatorRecord,
      msg: ``,
    });
});

module.exports = router;

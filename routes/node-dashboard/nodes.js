require("dotenv").config();
var express = require("express");
var router = express.Router();
const keccak256 = require("keccak256");
const mysql = require("mysql");
const { Telegraf } = require("telegraf");
const axios = require("axios");
const web3passport = require("../../auth/passport");

const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.OTHUB_DB,
});

const otp_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.SYNC_DB,
});

const otp_testnet_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.SYNC_DB_TESTNET,
});

function executeOTPQuery(query, params, network) {
  return new Promise((resolve, reject) => {
    if (network == "Origintrail Parachain Testnet") {
        otp_testnet_connection.query(query, params, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
      }
      if (network == "Origintrail Parachain Mainnet") {
        otp_connection.query(query, params, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
      }
  });
}

async function getOTPData(query, params, network) {
  try {
    const results = await executeOTPQuery(query, params, network);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

function executeOTHubQuery(query, params) {
  return new Promise((resolve, reject) => {
    othubdb_connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

async function getOTHubData(query, params) {
  try {
    const results = await executeOTHubQuery(query, params);
    return results;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

/* GET explore page. */
router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
      ip = req.headers["x-forwarded-for"];
    }

    public_address = req.user[0].public_address;
    network = req.body.network;

    nodes = [];
    operatorRecord = [];

    keccak256hash = keccak256(public_address).toString("hex");
    keccak256hash = "0x" + keccak256hash;
    like_keccak256hash = "%" + keccak256hash + "%";

    query = `select nodeId,tokenName from v_nodes where current_adminWallet_hashes like ?`;
    params = [like_keccak256hash];
    nodes = await getOTPData(query, params, network)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    query = `select * from node_operators where public_address = ?`;
    params = [public_address];
    operatorRecord = await getOTHubData(query, params)
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

require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const keccak256 = require("keccak256");
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
    if (network === "Origintrail Parachain Testnet") {
      otp_testnet_connection.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    }
    if (network === "Origintrail Parachain Mainnet") {
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
  limit = "200";
  conditions = [];
  params = []

  query = `select signer,UAL,datetime,tokenId,transactionHash,eventName,eventValue1 from v_pubs_activity_last1min UNION ALL select tokenSymbol,UAL,datetime,tokenId,transactionHash,eventName,eventValue1 from v_nodes_activity_last1min WHERE eventName != 'StakeIncreased' AND transactionHash != '' AND transactionHash is not null order by datetime desc LIMIT ${limit}`;

  data = await getOTPData(query, params, network)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  res.json({
    chart_data: data,
  });
});

module.exports = router;

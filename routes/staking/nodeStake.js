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

  console.log(req.body)
  nodeId = req.body.nodeId;
  public_address = req.body.public_address;
  timeframe = req.body.timeframe;
  network = req.body.network;
  limit = "1000";
  conditions = [];
  params = [];

  query = `SELECT * from v_nodes_stake_latest`;

  console.log(nodeId)
  if (nodeId !== "All") {
    conditions.push(`nodeId = ?`);
    params.push(nodeId);
  } else {
    keccak256hash = keccak256(public_address).toString("hex");
    keccak256hash = "0x" + keccak256hash;
    like_keccak256hash = "%" + keccak256hash + "%";

    node_id_query = `select * from v_nodes where current_adminWallet_hashes like ?`;
    node_id_params = [like_keccak256hash];
    nodeIds = await getOTPData(node_id_query, node_id_params, network)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    prm = ''
    console.log(nodeIds)
    for (i = 0; i < Number(nodeIds.length); i++) {
      prm = '?,' + prm
      params.push(nodeIds[0].nodeId);
    }

    console.log(prm)
    if(Number(nodeIds.length) != 0){
      prm = prm.substring(0, prm.length - 1)
      conditions.push(`nodeId in (${prm})`);
    }
  }

  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery =
    query + " " + whereClause;

    console.log(sqlQuery)
  data = await getOTPData(sqlQuery, params, network)
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

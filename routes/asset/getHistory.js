require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
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

function executeOTPQuery(query, params,network) {
  return new Promise((resolve, reject) => {
    if (network == "Origintrail Parachain Testnet") {
        otp_testnet_connection.query(query, params, (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          });
      } else {
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
    const results = await executeOTPQuery(query, params,network);
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

  data = req.body;

  const segments = data.ual.split(":");
  const argsString =
    segments.length === 3 ? segments[2] : segments[2] + segments[3];
  const args = argsString.split("/");

  if (args.length !== 3) {
    console.log(`Get request with invalid ual from ${data.api_key}`);
    resp_object = {
      result: "Invalid UAL provided.",
    };
    res.send(resp_object);
    return;
  }

  limit = data.limit;
  if (!limit) {
    limit = 500;
  }

  query = `SELECT * FROM v_asset_history`;
  conditions = [];
  params = [];

  conditions.push(`asset_contract = ?`);
  params.push(args[1]);

  conditions.push(`token_id = ?`);
  params.push(args[2]);

  conditions.push(
    `(transfer_from != '0x0000000000000000000000000000000000000000' or transfer_from is null)`
  );

  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery = query + " " + whereClause + `LIMIT ${limit}`;
  assetHistory = await getOTPData(sqlQuery, params, data.network)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  res.json({
    assetHistory: assetHistory
  });
});

module.exports = router;

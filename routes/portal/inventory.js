require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const purl = require("url");

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

/* GET explore page. */
router.get("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  url_params = purl.parse(req.url, true).query;
  if(url_params.auth !== process.env.RUNTIME_AUTH){
    console.log(`Runtime request received from ${ip} with invalid auth key.`);
      resp_object = {
        status: "401",
        result: "401 Unauthorized: Auth Key does not match.",
      };
      res.send(resp_object);
      return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  query = `select * from v_pubs`;
  conditions = [];
  params = [];

  limit = 100;
  if (url_params.limit && Number(url_params.limit)) {
    limit = url_params.limit;
  }

  order_by = "block_ts_hour";
  if (url_params.order) {
    order_by = url_params.order;
  }

  if (url_params.ual) {
    conditions.push(`ual = ?`);
    params.push(url_params.ual);
  }

  console.log(url_params.owner)
  if (url_params.owner) {
    conditions.push(`owner = ?`);
    params.push(url_params.owner);
  }

  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery =
    query + " " + whereClause + ` order by ${order_by} desc LIMIT ${limit}`;

    console.log(sqlQuery)
    console.log(params)
  v_pubs = "";
  v_pubs = await getOTPData(sqlQuery, params, url_params.network)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  if (url_params.ual) {
    console.log(v_pubs);
  }

  res.json({
    v_pubs: v_pubs,
    msg: ``,
  });
});

module.exports = router;

require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const purl = require("url");
const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.OTHUB_DB,
});

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
router.get("/", async function (req, res, next) {
  try {
    ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
      ip = req.headers["x-forwarded-for"];
    }

    url_params = purl.parse(req.url, true).query;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    if (url_params.rejectTxn) {
      query = `UPDATE txn_header set progress = 'REJECTED' where txn_id = ?`;
      await othubdb_connection.query(
        query,
        [url_params.rejectTxn],
        function (error, results, fields) {
          if (error) throw error;
        }
      );
    }

    query = `select * from txn_header`;
    conditions = [];
    params = [];

    limit = 100;
    if (url_params.limit && Number(url_params.limit)) {
      limit = url_params.limit;
    }

    if (url_params.account) {
      conditions.push(`public_address = ?`);
      params.push(url_params.account);
    }

    conditions.push(`network = ?`);
    if (url_params.network == "Origintrail Parachain Testnet") {
      params.push("otp::testnet");
    }
    if (url_params.network == "Origintrail Parachain Mainnet") {
      params.push("otp::mainnet");
    }

    if (url_params.txn_id) {
      conditions.push(`txn_id = ?`);
      params.push(url_params.txn_id);
    }

    if (url_params.app_name) {
      conditions.push(`app_name = ?`);
      params.push(url_params.app_name);
    }

    if (url_params.ual) {
      conditions.push(`ual = ?`);
      params.push(url_params.ual);
    }

    if (url_params.progress == "COMPLETE") {
      conditions.push(`progress = ?`);
      params.push(url_params.progress);
    }

    if (url_params.progress == "PENDING") {
      conditions.push(`progress = ?`);
      params.push(url_params.progress);
    }

    if (url_params.progress == "REJECTED") {
      conditions.push(`progress = ?`);
      params.push(url_params.progress);
    }

    if (url_params.progress == "ALL") {
      conditions.push(`progress in (?,?,?)`);
      params.push("COMPLETE");
      params.push("PENDING");
      params.push("REJECTED");
    }

    if (
      url_params.progress == "COMPLETE" ||
      url_params.progress == "PENDING" ||
      url_params.progress == "REJECTED"
    ) {
      conditions.push(`progress = ?`);
      params.push(url_params.progress);
    }

    if (url_params.request == "ALL") {
      conditions.push(`request in (?,?,?)`);
      params.push("Mint");
      params.push("Update");
      params.push("Transfer");
    }

    if (
      url_params.request == "Mint" ||
      url_params.request == "Update" ||
      url_params.request == "Transfer"
    ) {
      conditions.push(`request = ?`);
      params.push(url_params.request);
    }

    order_by = "created_at";
    if (url_params.order_by) {
      order_by = url_params.order_by;
    }

    whereClause =
      conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
    sqlQuery =
      query + " " + whereClause + ` order by ${order_by} desc LIMIT ${limit}`;

    console.log(sqlQuery);
    txn_header = await getOTHubData(sqlQuery, params)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    conditions = [];
    params = [];

    if (url_params.account) {
      conditions.push(`public_address = ?`);
      params.push(url_params.account);
    }

    conditions.push(`network = ?`);
    if (url_params.network == "Origintrail Parachain Testnet") {
      params.push("otp::testnet");
    }
    if (url_params.network == "Origintrail Parachain Mainnet") {
      params.push("otp::mainnet");
    }

    whereClause =
      conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
    sqlQuery =
      query + " " + whereClause + ` order by ${order_by} desc LIMIT ${limit}`;

    raw_txn_header = await getOTHubData(sqlQuery, params)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    res.json({
      raw_txn_header: raw_txn_header,
      txn_header: txn_header,
      msg: ``,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

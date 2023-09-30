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

function executeOTPQuery(query, params,network ) {
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

  if(ip !== process.env.WHITE_LIST){
    console.log(`v_nodes request without authorization.`);
    resp_object = {
      status: "401",
      result: `401 Unauthorized: Blocklisted IP trying to reach runtime: ${ip}`,
    };
    res.send(resp_object);
    return;
  }
  
  url_params = purl.parse(req.url, true).query;
  network = url_params.network

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

  if (url_params.nodeId && Number(url_params.nodeId)) {
    nodeId = Number(url_params.nodeId);
    conditions.push(`winners like ? OR winners like ? OR winners like ?`);

    nodeId = `%"${nodeId},%`;
    params.push(nodeId);

    nodeId = `%,${nodeId},%`;
    params.push(nodeId);

    nodeId = `%,${nodeId}"%`;
    params.push(nodeId);
  }

  if (url_params.publisher) {
    conditions.push(`publisher = ?`);
    params.push(url_params.publisher);
  }

  order_by = "block_ts_hour";
  if (url_params.order) {
    order_by = url_params.order;
  }

  if (url_params.ual) {
    conditions.push(`ual = ?`);
    params.push(url_params.ual);
  }

  if (network == '') {
    network = 'Origintrail Parachain Mainnet'
  }


  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery =
    query + " " + whereClause + ` order by ${order_by} desc LIMIT ${limit}`;

  v_pubs = "";
  console.log(sqlQuery);
  v_pubs = await getOTPData(sqlQuery, params,network)
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

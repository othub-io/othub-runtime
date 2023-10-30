require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const web3passport = require('../auth/passport');

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
router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  data = req.body;

  query = `select * from v_pubs`;
  conditions = [];
  params = [];

  limit = 100;
  if (data.limit && Number(data.limit)) {
    limit = data.limit;
  }

  order_by = "block_ts_hour";
  if (data.order) {
    order_by = data.order;
  }

  if (data.ual) {
    conditions.push(`ual = ?`);
    params.push(data.ual);
  }

  conditions.push(`owner = ?`);
  params.push(req.user[0].public_address);

  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery =
    query + " " + whereClause + ` order by ${order_by} desc LIMIT ${limit}`;

  v_pubs = "";
  v_pubs = await getOTPData(sqlQuery, params, data.network)
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

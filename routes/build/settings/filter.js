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

        query = `select * from txn_header`;
        conditions = [];
        params = [];

        limit = 100;
        if (url_params.limit && Number(url_params.limit)) {
            limit = url_params.limit;
        }

        if (url_params.network == "Origintrail Parachain Testnet") {
            conditions.push(`network = ?`);
            params.push("otp::testnet");
        }
        if (url_params.network == "Origintrail Parachain Mainnet") {
            conditions.push(`network = ?`);
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
            params.push("Create");
            params.push("Update");
            params.push("Transfer");
            params.push("Query");
            params.push("get");
            params.push("getLatestStateIssuer");
            params.push("getOwner");
            params.push("getState");
            params.push("getStateIssuer");
        }

        if (
            url_params.request == "Create" ||
            url_params.request == "Update" ||
            url_params.request == "Transfer" ||
            url_params.request == "Query" ||
            url_params.request == "get" ||
            url_params.request == "getLatestStateIssuer" ||
            url_params.request == "getOwner" ||
            url_params.request == "getState" ||
            url_params.request == "getStateIssuer"
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
        console.log(params);
        app_txns = await getOTHubData(sqlQuery, params)
            .then((results) => {
                //console.log('Query results:', results);
                return results;
                // Use the results in your variable or perform further operations
            })
            .catch((error) => {
                console.error("Error retrieving data:", error);
            });

        assets = 0
        for (i = 0; i < app_txns.length; i++) {
            if (app_txns[i].request === 'Create' && app_txns[i].progress === 'COMPLETE') {
                assets = assets + 1
            }
        }

        query = `SELECT DISTINCT app_name FROM app_header WHERE public_address = ? order by app_name asc`;
        params = [url_params.account];
        appNames = await getOTHubData(query, params)
            .then((results) => {
                //console.log('Query results:', results);
                return results;
                // Use the results in your variable or perform further operations
            })
            .catch((error) => {
                console.error("Error retrieving data:", error);
            });

        query = `SELECT * FROM app_header WHERE app_name = ?`;
        params = [url_params.app_name];
        keyRecords = await getOTHubData(query, params)
            .then((results) => {
                //console.log('Query results:', results);
                return results;
                // Use the results in your variable or perform further operations
            })
            .catch((error) => {
                console.error("Error retrieving data:", error);
            });

        query = `SELECT * FROM app_header WHERE app_name = ? LIMIT 1`;
        params = [url_params.app_name];
        appRecords = await getOTHubData(query, params)
            .then((results) => {
                //console.log('Query results:', results);
                return results;
                // Use the results in your variable or perform further operations
            })
            .catch((error) => {
                console.error("Error retrieving data:", error);
            });

        query = `select * from enabled_apps where app_name = ?`;
        params = [url_params.app_name];
        users = await getOTHubData(query, params)
            .then((results) => {
                //console.log('Query results:', results);
                return results;
                // Use the results in your variable or perform further operations
            })
            .catch((error) => {
                console.error("Error retrieving data:", error);
            });

        console.log(`Visitor:${url_params.account} filtered txns.`);
        res.json({
            appNames: appNames,
            appRecords: appRecords,
            keyRecords: keyRecords,
            app_txns: app_txns,
            users: users,
            assets: assets,
            msg: ``,
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;

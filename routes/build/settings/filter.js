require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const web3passport = require('../../../auth/passport');
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
router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    try {
        ip = req.socket.remoteAddress;
        if (process.env.SSL_KEY_PATH) {
            ip = req.headers["x-forwarded-for"];
        }

        data = req.body;

        query = `select * from txn_header`;
        conditions = [];
        params = [];

        limit = 100;
        if (data.limit && Number(data.limit)) {
            limit = data.limit;
        }

        if (data.network == "Origintrail Parachain Testnet") {
            conditions.push(`network = ?`);
            params.push("otp::testnet");
        }
        if (data.network == "Origintrail Parachain Mainnet") {
            conditions.push(`network = ?`);
            params.push("otp::mainnet");
        }

        if (data.txn_id) {
            conditions.push(`txn_id = ?`);
            params.push(data.txn_id);
        }

        if (data.app_name) {
            conditions.push(`app_name = ?`);
            params.push(data.app_name);
        }

        if (data.ual) {
            conditions.push(`ual = ?`);
            params.push(data.ual);
        }

        if (data.progress == "ALL") {
            conditions.push(`progress in (?,?,?)`);
            params.push("COMPLETE");
            params.push("PENDING");
            params.push("REJECTED");
        }

        if (
            data.progress == "COMPLETE" ||
            data.progress == "PENDING" ||
            data.progress == "REJECTED"
        ) {
            conditions.push(`progress = ?`);
            params.push(data.progress);
        }

        if (data.request == "ALL") {
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
            data.request == "Create" ||
            data.request == "Update" ||
            data.request == "Transfer" ||
            data.request == "Query" ||
            data.request == "get" ||
            data.request == "getLatestStateIssuer" ||
            data.request == "getOwner" ||
            data.request == "getState" ||
            data.request == "getStateIssuer"
        ) {
            conditions.push(`request = ?`);
            params.push(data.request);
        }

        order_by = "created_at";
        if (data.order_by) {
            order_by = data.order_by;
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
        params = [req.user[0].public_address];
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
        params = [data.app_name];
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
        params = [data.app_name];
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
        params = [data.app_name];
        users = await getOTHubData(query, params)
            .then((results) => {
                //console.log('Query results:', results);
                return results;
                // Use the results in your variable or perform further operations
            })
            .catch((error) => {
                console.error("Error retrieving data:", error);
            });

        console.log(`Visitor:${req.user[0].public_address} filtered txns.`);
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

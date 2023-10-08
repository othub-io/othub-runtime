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
    port: "3306",
    insecureAuth: true,
});

function executeQuery(query, params) {
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

async function getData(query, params) {
    try {
        const results = await executeQuery(query, params);
        return results;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    }
}

router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
        ip = req.headers["x-forwarded-for"];
    }

    data = req.body;
    public_address = req.user[0].public_address;
    app_name = data.app_name;
    delete_key = data.delete_key;
    msg = ``
    keyRecords = [];

    console.log(`Visitor:${public_address} is deleting api key ${delete_key}.`);

    query = `SELECT * FROM app_header WHERE api_key = ?`;
    params = [delete_key];
    app = await getData(query, params)
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

        console.log(app)
    query = `DELETE FROM app_header WHERE api_key = ?`;
    await othubdb_connection.query(
        query,
        [delete_key],
        function (error, results, fields) {
            if (error) throw error;
        }
    );

    query = `DELETE FROM txn_header WHERE api_key = ?`;
    await othubdb_connection.query(
        query,
        [delete_key],
        function (error, results, fields) {
            if (error) throw error;
        }
    );

    query = `SELECT DISTINCT app_name FROM app_header WHERE public_address = ? order by app_name asc`;
    params = [public_address];
    appNames = await getData(query, params)
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });


    if (!appNames) {
        app_name = ''
    }

    if (appNames && appNames.some((obj) => obj.app_name != app[0].app_name)) {
        app_name = appNames[0].app_name
    }

    if (appNames && appNames.some((obj) => obj.app_name === app[0].app_name)) {
        app_name = app[0].app_name
    }


    query = `SELECT * FROM app_header WHERE app_name = ?`;
    params = [app_name];
    keyRecords = await getData(query, params)
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    query = `SELECT * FROM app_header WHERE app_name = ? LIMIT 1`;
    params = [app_name];
    appRecords = await getData(query, params)
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    network = ''
    if (data.network == "Origintrail Parachain Testnet") {
        network = "otp::testnet"
    }
    if (data.network == "Origintrail Parachain Mainnet") {
        network = "otp::mainnet"
    }

    query = `SELECT * FROM txn_header WHERE app_name = ? AND network = ?`;
    params = [app_name, network];
    app_txns = await getData(query, params)
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

    query = `select * from enabled_apps where app_name = ?`;
    params = [app_name];
    users = await getData(query, params)
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    console.log(`Visitor:${public_address} deleted api key ${delete_key}.`);
    res.json({
        appNames: appNames,
        appRecords: appRecords,
        keyRecords: keyRecords,
        public_address: public_address,
        app_txns: app_txns,
        users: users,
        assets: assets,
        msg: ``,
    });
    return;
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const web3passport = require('../../auth/passport');
const queryTypes = require('../../util/queryTypes')
const queryDB = queryTypes.queryDB()

router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
        ip = req.headers["x-forwarded-for"];
    }

    data = req.body;
    public_address = req.user[0].public_address;
    app_name = data.app_name;
    msg = ``
    keyRecords = [];

    console.log(`Visitor:${public_address} is deleting app ${app_name}.`);

    query = `DELETE FROM app_header WHERE app_name = ?`;
    await queryDB.getData(query, [app_name], "", "othub_db")
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    query = `DELETE FROM txn_header WHERE app_name = ?`;
    await queryDB.getData(query, [app_name], "", "othub_db")
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    query = `SELECT DISTINCT app_name FROM app_header WHERE public_address = ? order by app_name asc`;
    params = [public_address];
    appNames = await queryDB.getData(query, params, "", "othub_db")
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    query = `SELECT * FROM app_header WHERE public_address = ?`;
    params = [public_address];
    app = await queryDB.getData(query, params, "", "othub_db")
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
    keyRecords = await queryDB.getData(query, params, "", "othub_db")
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
    appRecords = await queryDB.getData(query, params, "", "othub_db")
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    network = ''
    if (data.network == "DKG Testnet") {
        network = "otp::testnet"
    }
    if (data.network == "DKG Mainnet") {
        network = "otp::mainnet"
    }

    query = `SELECT * FROM txn_header WHERE app_name = ? AND network = ?`;
    params = [app_name, network];
    app_txns = await queryDB.getData(query, params, "", "othub_db")
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
    users = await queryDB.getData(query, params, "", "othub_db")
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    console.log(`Visitor:${public_address} deleted app ${app_name}.`);
    res.json({
        appNames: appNames,
        appRecords: appRecords,
        keyRecords: keyRecords,
        app_txns: app_txns,
        users: users,
        assets: assets,
        msg: ``,
    });
    return;
});

module.exports = router;

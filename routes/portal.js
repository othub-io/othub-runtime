require("dotenv").config();
const express = require("express");
const router = express.Router();
const web3passport = require("../auth/passport");
const queryTypes = require('../util/queryTypes')
const queryDB = queryTypes.queryDB()

router.post(
  "/",
  web3passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      ip = req.socket.remoteAddress;
      if (process.env.SSL_KEY_PATH) {
        ip = req.headers["x-forwarded-for"];
      }

      data = req.body;

      if (data.rejectTxn) {
        query = `UPDATE txn_header set progress = 'REJECTED' where txn_id = ?`;
        await othubdb_connection.query(
          query,
          [data.rejectTxn],
          function (error, results, fields) {
            if (error) throw error;
          }
        );
      }

      if (data.completeTxn) {
        query = `UPDATE txn_header set progress = 'COMPLETE',ual = ?, epochs = ? where txn_id = ?`;
        await othubdb_connection.query(
          query,
          [data.ual, data.epochs, data.completeTxn],
          function (error, results, fields) {
            if (error) throw error;
          }
        );
      }

      if (data.enable_apps) {
        query = "DELETE FROM enabled_apps WHERE public_address = ?";
        await othubdb_connection.query(
          query,
          [req.user[0].public_address],
          function (error, results, fields) {
            if (error) throw error;
          }
        );

        enable_apps = JSON.parse(data.enable_apps);
        for (const key in enable_apps) {
          const value = enable_apps[key];
          if (value === true) {
            query =
              "INSERT INTO enabled_apps (public_address,app_name) VALUES (?,?)";
            await othubdb_connection.query(
              query,
              [req.user[0].public_address, key],
              function (error, results, fields) {
                if (error) throw error;
              }
            );
          }
        }
      }

      query = `select * from txn_header`;
      conditions = [];
      params = [];

      limit = 100;
      if (data.limit && Number(data.limit)) {
        limit = data.limit;
      }

      if (req.user[0].public_address) {
        conditions.push(`approver = ?`);
        params.push(req.user[0].public_address);
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
      }

      if (
        data.request == "Create" ||
        data.request == "Update" ||
        data.request == "Transfer"
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

      txn_header = await queryDB.getData(sqlQuery, params)
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

        conditions.push(`approver = ?`);
        params.push(req.user[0].public_address);

        if (data.network == "Origintrail Parachain Testnet") {
          conditions.push(`network = ?`);
          params.push("otp::testnet");
        }
        if (data.network == "Origintrail Parachain Mainnet") {
          conditions.push(`network = ?`);
          params.push("otp::mainnet");
        }

      whereClause =
        conditions.length > 0 ? "WHERE LOWER(" + conditions.join(") AND ") : "";
      sqlQuery =
        query + " " + whereClause + ` order by ${order_by} desc LIMIT ${limit}`;

      raw_txn_header = await queryDB.getData(sqlQuery, params)
        .then((results) => {
          //console.log('Query results:', results);
          return results;
          // Use the results in your variable or perform further operations
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

      sqlQuery = "select app_name from enabled_apps where public_address = ?";
      params = [req.user[0].public_address];
      enabled_apps = await queryDB.getData(sqlQuery, params)
        .then((results) => {
          //console.log('Query results:', results);
          return results;
          // Use the results in your variable or perform further operations
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

      sqlQuery = "select DISTINCT app_name from app_header";
      params = [];
      all_apps = await queryDB.getData(sqlQuery, params)
        .then((results) => {
          //console.log('Query results:', results);
          return results;
          // Use the results in your variable or perform further operations
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

      apps_enabled = [];
      for (let i = 0; i < all_apps.length; i++) {
        let app_name = all_apps[i].app_name;
        let app_obj = {
          app_name: app_name,
          checked: false,
        };

        apps_enabled.push(app_obj);
      }

      for (let i = 0; i < apps_enabled.length; i++) {
        if (
          enabled_apps.some((obj) => obj.app_name === apps_enabled[i].app_name)
        ) {
          apps_enabled[i].checked = true;
        }
      }

      res.json({
        raw_txn_header: raw_txn_header,
        txn_header: txn_header,
        apps_enabled: apps_enabled,
        msg: ``,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const web3passport = require("../../auth/passport");
const queryTypes = require("../../util/queryTypes");
const queryDB = queryTypes.queryDB();

function randomWord(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; ++i) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

router.post(
  "/",
  web3passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
      ip = req.headers["x-forwarded-for"];
    }

    data = req.body;
    public_address = req.user[0].public_address;
    network = data.network;
    app_name = data.app_name;
    app_description = data.app_description;
    website = data.website;
    github = data.github;
    built_by = data.built_by;
    key_count = data.key_count;
    ual = data.ual;
    msg = ``;

    console.log(`Visitor:${public_address} is creating an app.`);

    query = `SELECT DISTINCT app_name FROM app_header WHERE public_address = ? order by app_name asc`;
    params = [public_address];
    appNames = await queryDB
      .getData(query, params, "", "othub_db")
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    if (appNames.length < 3) {
      access = "Basic";
      for (i = 0; i < Number(key_count); i++) {
        api_key = await randomWord(Math.floor(25) + 5);
        query = `INSERT INTO app_header values (?,?,?,?,?,?,?,?,?)`;
        await queryDB
          .getData(
            query,
            [
              api_key,
              public_address,
              app_name,
              access,
              app_description,
              website,
              github,
              built_by,
              null,
            ],
            "",
            "othub_db"
          )
          .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
          })
          .catch((error) => {
            console.error("Error retrieving data:", error);
          });
      }
      console.log(`Visitor:${public_address} created an app.`);
      msg = `${app_name} has been created!`;
    } else {
      console.log(
        `Visitor:${public_address} tried creating an app but hit the limit.`
      );
      msg = `You may only have 3 apps at a time.`;
      app_name = appNames[0].app_name;
    }

    query = `SELECT DISTINCT app_name FROM app_header WHERE public_address = ? order by app_name asc`;
    params = [public_address];
    appNames = await queryDB
      .getData(query, params, "", "othub_db")
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
    appRecords = await queryDB
    .getData(query, params, "", "othub_db")
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    query = `SELECT * FROM app_header WHERE app_name = ?`;
    params = [app_name];
    keyRecords = await queryDB
    .getData(query, params, "", "othub_db")
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    network = "";
    if (network == "DKG Testnet") {
      network = "otp::testnet";
    }
    if (network == "DKG Mainnet") {
      network = "otp::mainnet";
    }

    query = `SELECT * FROM txn_header WHERE app_name = ? AND network = ?`;
    params = [app_name, network];
    app_txns = await queryDB
    .getData(query, params, "", "othub_db")
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    assets = 0;
    for (i = 0; i < app_txns.length; i++) {
      if (
        app_txns[i].request === "Create" &&
        app_txns[i].progress === "COMPLETE"
      ) {
        assets = assets + 1;
      }
    }

    query = `select * from enabled_apps where app_name = ?`;
    params = [app_name];
    users = await queryDB
    .getData(query, params, "", "othub_db")
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    res.json({
      appNames: appNames,
      appRecords: appRecords,
      keyRecords: keyRecords,
      public_address: public_address,
      app_txns: app_txns,
      users: users,
      assets: assets,
      msg: msg,
    });

    return;
  }
);

module.exports = router;

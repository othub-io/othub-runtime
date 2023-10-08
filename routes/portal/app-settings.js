require("dotenv").config();
var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const web3passport = require('../../auth/passport');
const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.OTHUB_DB,
});

function executeOTHubQuery (query, params) {
    return new Promise((resolve, reject) => {
      othubdb_connection.query(query, params, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }
  
  async function getOTHubData (query, params) {
    try {
      const results = await executeOTHubQuery(query, params)
      return results
    } catch (error) {
      console.error('Error executing query:', error)
      throw error
    }
  }

/* GET explore page. */
router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  data = req.body;

  app_search = data.app_search
  query = 'select * from othubdb.app_header where app_name = ? LIMIT 1'
  params = [app_search];
  if(app_search === ''){
      query = 'select DISTINCT app_name from othubdb.app_header'
    params = [];
  }

  search_result = await getOTHubData(query, params)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

    sqlQuery = "select app_name from enabled_apps where public_address = ?";
    params = [data.account];
    enabled_apps = await getOTHubData(sqlQuery, params)
        .then((results) => {
            //console.log('Query results:', results);
            return results;
            // Use the results in your variable or perform further operations
        })
        .catch((error) => {
            console.error("Error retrieving data:", error);
        });

    apps_enabled = [];
    if (search_result) {
        for (let i = 0; i < search_result.length; i++) {
            let app_name = search_result[i].app_name;
            let app_obj = {
                app_name: app_name,
                checked: false,
            };

            apps_enabled.push(app_obj);
        }

        for (let i = 0; i < apps_enabled.length; i++) {
            if (enabled_apps.some((obj) => obj.app_name === apps_enabled[i].app_name)) {
                apps_enabled[i].checked = true;
            }
        }
    }

    console.log(apps_enabled)
  res.json({
      search_result: search_result,
      apps_enabled: apps_enabled
  });
});

module.exports = router;

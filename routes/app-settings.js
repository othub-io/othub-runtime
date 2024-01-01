require("dotenv").config();
const express = require("express");
const router = express.Router();
const web3passport = require('../auth/passport');
const queryTypes = require('../util/queryTypes')
const queryDB = queryTypes.queryDB()

/* GET explore page. */
router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  network = ""
  blockchain = "othub_db"

  query = 'select * from othubdb.app_header where app_name = ? LIMIT 1'
  params = [req.body.app_search];
  if(app_search === ''){
      query = 'select DISTINCT app_name from othubdb.app_header'
    params = [];
  }

  search_result = await queryDB.getData(query, params, network, blockchain)
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
    enabled_apps = await queryDB.getData(sqlQuery, params, network, blockchain)
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

  res.json({
      search_result: search_result,
      apps_enabled: apps_enabled
  });
});

module.exports = router;

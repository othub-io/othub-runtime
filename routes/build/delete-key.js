require("dotenv").config();
var express = require("express");
var router = express.Router();
const purl = require("url");
const mysql = require("mysql");
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

router.get("/", async function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  url_params = purl.parse(req.url, true).query;
  public_address = url_params.public_address;
  api_key = url_params.api_key;

  console.log(`Visitor:${public_address} is deleting an api key.`);

  query = "DELETE FROM app_header WHERE api_key = ?";
  await othubdb_connection.query(
    query,
    [api_key],
    function (error, results, fields) {
      if (error) throw error;
    }
  );

  query = `SELECT * FROM app_header WHERE public_address = ? order by app_name asc`;
  params = [public_address];
  appRecords = await getData(query, params)
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
    dist_appRecords = await getData(query, params)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

  res.json({
    dist_appRecords: dist_appRecords,
    appRecords: appRecords,
    public_address: public_address,
    msg: `Key ${api_key} has been deleted.`,
  });

  console.log(`Visitor:${public_address} deleted an api key.`);
  return;
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require('../../util/queryTypes')
const queryDB = queryTypes.queryDB()

/* GET explore page. */
router.post("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  blockchain = req.body.blockchain;
  network = ""

  const segments = req.body.ual.split(":");
  const argsString =
    segments.length === 3 ? segments[2] : segments[2] + segments[3];
  const args = argsString.split("/");

  if (args.length !== 3) {
    console.log(`Get request with invalid ual from ${data.api_key}`);
    resp_object = {
      result: "Invalid UAL provided.",
    };
    res.send(resp_object);
    return;
  }

  limit = req.body.limit;
  if (!limit) {
    limit = 500;
  }

  query = `SELECT * FROM v_asset_history`;
  conditions = [];
  params = [];

  conditions.push(`asset_contract = ?`);
  params.push(args[1]);

  conditions.push(`token_id = ?`);
  params.push(args[2]);

  conditions.push(
    `(transfer_from != '0x0000000000000000000000000000000000000000' or transfer_from is null)`
  );

  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery = query + " " + whereClause + `LIMIT ${limit}`;
  assetHistory = await queryDB
  .getData(sqlQuery, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  res.json({
    assetHistory: assetHistory
  });
});

module.exports = router;

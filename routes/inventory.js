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
  blockchain = req.body.blockchain;

  query = `select * from v_pubs`;
  conditions = [];
  params = [];

  limit = 100;
  if (req.body.limit && Number(req.body.limit)) {
    limit = data.limit;
  }

  order_by = "block_ts_hour";
  if (req.body.order) {
    order_by = req.body.order;
  }

  if (req.body.ual) {
    conditions.push(`ual = ?`);
    params.push(req.body.ual);
  }

  conditions.push(`owner = ?`);
  params.push(req.user[0].public_address);

  whereClause =
    conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
  sqlQuery =
    query + " " + whereClause + ` order by ${order_by} desc LIMIT ${limit}`;

  v_pubs = "";
  v_pubs = await queryDB.getData(sqlQuery, params, network, blockchain)
    .then((results) => {
      //console.log('Query results:', results);
      return results;
      // Use the results in your variable or perform further operations
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });

  res.json({
    v_pubs: v_pubs,
    msg: ``,
  });
});

module.exports = router;

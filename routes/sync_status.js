require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require("../util/queryTypes");
const queryDB = queryTypes.queryDB();

/* GET explore page. */
router.post("/", async function (req, res, next) {
  ip = req.socket.remoteAddress;
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers["x-forwarded-for"];
  }

  let sync = [];
  let network = ""
  let chains = [
    "NeuroWeb Mainnet",
    "NeuroWeb Testnet",
    "Gnosis Mainnet",
    "Chiado Testnet",
  ];
  let query = `select val from v_sys_sync_status where parameter = 'sync_to_reality_delay_mins' OR parameter = 'last_synced_block_timestamp'`;
  let params = [];
  for (const chain of chains) {
    let sync_status;
    let blockchain = chain
    sync_info = await queryDB
      .getData(query, params, network, blockchain)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

      console.log(sync_info[0])
    if (sync_info[1].val > 30) {
      sync_status = false;
    }

    record = {
      status: sync_status,
      blockchain: blockchain,
      last_sync: sync_info[0].val,
    };
    sync.push(record);
  }

  console.log(sync)
  res.json({
    sync: sync,
    msg: ``,
  });
});

module.exports = router;

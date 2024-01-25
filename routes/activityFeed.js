require("dotenv").config();
const express = require("express");
const router = express.Router();
const queryTypes = require('../util/queryTypes')
const queryDB = queryTypes.queryDB()

/* GET explore page. */
router.post("/", async function (req, res, next) {
  try{
    timeframe = req.body.timeframe;
    network = req.body.network;
    blockchain = req.body.blockchain;

    if (blockchain) {
      network = "";
    }

    if(blockchain !== "Chiado Testnet" && blockchain !== "NeuroWeb Testnet" && blockchain !== "Gnosis Mainnet" && blockchain !== "NeuroWeb Mainnet"){
      res.json({
        activity_data: [],
      });
    }

    limit = "200";
    conditions = [];
    params = []

    query = `select signer,UAL,datetime,tokenId,transactionHash,eventName,eventValue1,chain_id from v_pubs_activity_last1min UNION ALL select tokenSymbol,UAL,datetime,tokenId,transactionHash,eventName,eventValue1,chain_id from v_nodes_activity_last1min WHERE eventName != 'StakeIncreased' order by datetime desc LIMIT ${limit}`;

    data = await queryDB.getData(query, params, network, blockchain)
      .then((results) => {
        //console.log('Query results:', results);
        return results;
        // Use the results in your variable or perform further operations
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    res.json({
      activity_data: data,
    });
  }catch(e){
    console.log(e)
  }
});

module.exports = router;

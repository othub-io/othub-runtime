require("dotenv").config();
var express = require("express");
var router = express.Router();
const keccak256 = require("keccak256");
const { Telegraf } = require("telegraf");
const axios = require("axios");
const web3passport = require("../../auth/passport");
const queryTypes = require('../../util/queryTypes')
const queryDB = queryTypes.queryDB()

/* GET explore page. */
router.post("/", web3passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
      ip = req.headers["x-forwarded-for"];
    }

    public_address = req.user[0].public_address;
    network = req.body.network;
    blockchain = "othub_db";
    botToken = req.body.botToken;
    telegramID = req.body.telegramID;
    sendScript = req.body.sendScript;

    nodeRecords = [];
    operatorRecord = [];

    if (!public_address) {
      res.json({
        nodeRecords: nodeRecords,
        operatorRecord: operatorRecord,
        msg: ` `,
      });
      return;
    }

    keccak256hash = keccak256(public_address).toString("hex");
    keccak256hash = "0x" + keccak256hash;
    like_keccak256hash = "%" + keccak256hash + "%";

    query = `select * from v_nodes where current_adminWallet_hashes like ?`;
    params = [like_keccak256hash];
    nodeIds = await queryDB.getData(query, params, network, blockchain)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    validToken = "no";
    if (botToken) {
      response = await axios
        .get(`https://api.telegram.org/bot${botToken}/getMe`)
        .then((results) => {
          return results;
        })
        .catch((error) => {
          console.error("Error checking token:", error);
        });

      if (response) {
        validToken = "yes";
      }
    }

    if (validToken === "yes") {
      query =
        "INSERT INTO node_operators (public_address,botToken) VALUES (?,?) ON DUPLICATE KEY UPDATE botToken = ?";
      await othubdb_connection.query(
        query,
        [public_address, botToken, botToken],
        function (error, results, fields) {
          if (error) throw error;
        }
      );
    }

    params = [public_address, telegramID, telegramID]
    query = "INSERT INTO node_operators (public_address,telegramID) VALUES (?,?) ON DUPLICATE KEY UPDATE telegramID = ?";
    if (telegramID && telegramID.length <= 10 && Number(telegramID)) {
      await queryTypes.queryDB(query, params, network, blockchain)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
    }

    query = `select * from node_operators where public_address = ?`;
    params = [public_address];
    operatorRecord = await queryTypes.queryDB(query, params, network, blockchain)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });

    if (
      sendScript &&
      operatorRecord[0].telegramID &&
      operatorRecord[0].botToken
    ) {
      msg = `
        Greetings from OThub.
        
Looks like you've added or changed your Telegram ID. Here are commands to run to install/update the othub node monitoring script on your node(s):`;

      for (i = 0; i < nodeIds.length; ++i) {
        msg =
          msg +
          `

<-------Run this for Node ${nodeIds[i].tokenName}------->
wget -O /etc/cron.hourly/node-hourly-monitor https://raw.githubusercontent.com/othub-io/othub-runtime/master/public/scripts/node-monitor-hourly.sh &&
chmod +x /etc/cron.hourly/node-hourly-monitor &&
mkdir -p /etc/othub &&
echo -e "CHAT_ID="${operatorRecord[0].telegramID}" \nBOT_ID="${operatorRecord[0].botToken}" \nNODE_ID="${nodeIds[i].nodeId}" \nAPI_KEY="${process.env.NODE_OPS_KEY}" \nMAX_STORAGE_PERCENT="90"" > /etc/othub/config

          `;
      }

      console.log(`Sending Message to users bot.`);
      try {
        bot = new Telegraf(operatorRecord[0].botToken);
        await bot.telegram.sendMessage(operatorRecord[0].telegramID, msg);
      } catch (e) {
        console.log(e);
      }
    }

    nodeRecords = [];
    for (i = 0; i < nodeIds.length; ++i) {
      query = `select * from v_nodes_stats where nodeId=? order by date desc LIMIT 1`;
      params = [nodeIds[i].nodeId];
      node_stat = await queryTypes.queryDB(query, params, network, blockchain)
        .then((results) => {
          return results;
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });

      nodeRecords.push(node_stat[0]);
    }

    res.json({
      nodeRecords: nodeRecords,
      operatorRecord: operatorRecord,
      msg: ``,
    });
});

module.exports = router;

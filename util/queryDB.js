const othub_db = require("../config/othub_db");
const dkg_mainnet = require("../config/dkg_mainnet");
const dkg_testnet = require("../config/dkg_testnet");
const otp_mainnet = require("../config/sync_otp_mainnet");
const otp_testnet = require("../config/sync_otp_testnet");
const gnosis_mainnet = require("../config/sync_gnosis_mainnet");
const gnosis_testnet = require("../config/sync_gnosis_testnet");

module.exports = executeQuery = async (query, params, network, blockchain) => {
  return new Promise((resolve, reject) => {
    console.log(blockchain)
    if (blockchain === "othub_db") {
      pool = othub_db;
    }

    if (blockchain === "Chiado Testnet") {
      pool = gnosis_testnet;
    }

    if (blockchain === "Gnosis Mainnet") {
      pool = gnosis_mainnet;
    }

    if (blockchain === "Origintrail Parachain Testnet") {
      pool = otp_testnet;
    }

    if (blockchain === "Origintrail Parachain Mainnet") {
      pool = otp_mainnet;
    }

    if (network === "DKG Mainnet") {
      pool = dkg_mainnet;
    }

    if (network === "DKG Testnet") {
      pool = dkg_testnet;
    }

    pool.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

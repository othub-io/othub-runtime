require("dotenv").config();
const express = require("express");
const router = express.Router();
const ethUtil = require("ethereumjs-util");
const jwt = require("jsonwebtoken");
const queryTypes = require('../../util/queryTypes')
const queryDB = queryTypes.queryDB()

router.post("/", async function (req, res, next) {
  try{
    ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
      ip = req.headers["x-forwarded-for"];
    }
  
    data = req.body;
    public_address = data.public_address;
    signature = data.signature;
    blockchain = "othub_db"
    network = ""
  
    query = `select * from user_header where public_address = ?`;
    params = [public_address];
    user_record = await queryDB
    .getData(query, params, network, blockchain)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  
    // Get user from db
    if (user_record) {
      const msg = `Please sign nonce ${user_record[0].nonce} to authenticate account ownership.`;
      // Convert msg to hex string
      const msgHex = ethUtil.bufferToHex(Buffer.from(msg));
  
      // Check if signature is valid
      const msgBuffer = ethUtil.toBuffer(msgHex);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(signature);
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      const addressBuffer = ethUtil.publicToAddress(publicKey);
      const address = ethUtil.bufferToHex(addressBuffer);
  
      // Check if address matches
      if (address.toLowerCase() === public_address.toLowerCase()) {
        // Change user nonce
        query = `UPDATE user_header SET nonce = ? where public_address = ?`;
        params = [Math.floor(Math.random() * 1000000), public_address];
        await queryDB
        .getData(query, params, network, blockchain)
          .then((results) => {
            return results;
          })
          .catch((error) => {
            console.error("Error retrieving data:", error);
          });
        // Set jwt token
        const token = jwt.sign(
          {
            _id: public_address,
            address: public_address,
          },
          process.env.JWT_SECRET,
          { expiresIn: "6h" }
        );
        res.status(200).json({
          success: true,
          token: `Bearer ${token}`,
          user_record: user_record,
          msg: "You are now logged in.",
        });
      } else {
        // User is not authenticated
        res.status(401).send("Invalid credentials");
      }
    }
  }catch(e){
    console.log(e)
  }
});

module.exports = router;

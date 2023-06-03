require("dotenv").config();
var express = require('express');
var router = express.Router();
//const queryTypes = require("./assets/js/queryTypes");

/* GET explore page. */
router.get('/', function(req, res, next) {
    ip = req.socket.remoteAddress;
    
    if (process.env.SSL_KEY_PATH) {
        ip = req.headers["x-forwarded-for"];
    }

    console.log(`Visitor:${ip} landed on the explore page.`);
    res.render("explore");
});

module.exports = router;

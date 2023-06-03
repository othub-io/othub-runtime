require("dotenv").config();
var express = require('express');
var router = express.Router();
const purl = require('url');
//const queryTypes = require("./assets/js/queryTypes");
const game_db = require("better-sqlite3")(process.env.GAME_DB);

/* GET explore page. */
router.get('/', async function(req, res, next) {
    ip = req.socket.remoteAddress;
    if (process.env.SSL_KEY_PATH) {
        ip = req.headers["x-forwarded-for"];
    }

    players = await game_db
        .prepare(
        "SELECT * FROM player_header"
        )
        .all();
        
        ual_list = []
        username_list = []
        knowledge_list = []

        for(i = 0; i < players.length; ++i){
        player = players[i]

        ual_list.push(player.ual)
        username_list.push(player.username)
        knowledge_list.push(JSON.parse(player.knowledge))

        }
        
        res.render("leaderboard", {
            ual_list: JSON.stringify(ual_list),
            username_list: JSON.stringify(username_list),
            knowledge_list: JSON.stringify(knowledge_list),
        });
});

module.exports = router;

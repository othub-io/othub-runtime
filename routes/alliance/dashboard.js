require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const { Telegraf } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)
const mysql = require('mysql')
const othubdb_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: 'otnodedb'
})
const operationaldb2_connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: 'operationaldb2'
})

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  url_params = purl.parse(req.url, true).query
  admin_key = url_params.admin_key

  if (!admin_key) {
    console.log(`Visitor:${ip} landed on the register page.`)
    res.render('register')
    return
  }

    let user;
    query = 'SELECT * FROM user_header WHERE admin_key = ? COLLATE NOCASE'
    await otnodedb_connection.query(query, [admin_key],function (error, results, fields) {
      if (error) throw error;
      user = results
    });

  if (user == '') {
      query = 'INSERT INTO user_header VALUES (?,?)'
      await otnodedb_connection.query(query, [admin_key, null],function (error, results, fields) {
        if (error) throw error;
      });

    res.render('dashboard', {
      admin_key: admin_key
    })
    return
  }

  console.log(`USER: ${JSON.stringify(user)}`)
  if (user[0].length < 2) {
    res.render('dashboard', {
      admin_key: admin_key
    })
    return
  }

    let alliance_member;
    query = 'SELECT * FROM alliance_members WHERE admin_key = ? COLLATE NOCASE'
    await otnodedb_connection.query(query, [admin_key],function (error, results, fields) {
      if (error) throw error;
      alliance_member = results
    });

  // if(JSON.stringify(my_nodes) == '[]'){
  //   res.render('register')
  //   return;
  // }

  console.log(`Visitor:${ip} landed on the dashboard page.`)
  res.render('dashboard', {
    msg: ``,
    alliance_member: JSON.stringify(alliance_member),
    api_key: user[0].api_key
  })
})

router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  url_params = purl.parse(req.url, true).query
  verification_ask = Number(req.body.verification_ask)
  admin_key = req.body.admin_key
  network_id = req.body.network_id

    let alliance_member;
    query = 'SELECT * FROM alliance_members WHERE network_id = ? COLLATE NOCASE'
    await otnodedb_connection.query(query, [network_id],function (error, results, fields) {
      if (error) throw error;
      alliance_member = results
    });

    bot_id = alliance_member[0].bot_id
    telegram_id = alliance_member[0].tg_id

  forget = req.body.forget
  if (forget == 'forget') {
      query = 'DELETE FROM alliance_members WHERE network_id = ? COLLATE NOCASE AND admin_key = ? COLLATE NOCASE'
      await otnodedb_connection.query(query, [network_id, admin_key],function (error, results, fields) {
        if (error) throw error;
      });
  }

    query = 'SELECT * FROM alliance_members WHERE admin_key = ? COLLATE NOCASE'
    await otnodedb_connection.query(query, [admin_key],function (error, results, fields) {
      if (error) throw error;
      alliance_member = results
    });

  if (alliance_member == '') {
    try {
      tg_member = await bot.telegram.getChatMember(
        process.env.GROUP,
        telegram_id
      )

      chat_id = process.env.GROUP
      if (bot_id != '') {
        members_bot = new Telegraf(bot_id)

        await members_bot.telegram.sendMessage(
          telegram_id,
          `@${tg_member.user.username}, 
You were kicked from the Alliance. Register a mainnet node if rejoin.`
        )
      }

      await bot.telegram.sendMessage(
        process.env.GROUP,
        `@${tg_member.user.username}, 
Removed their last node and left the Allaince.`
      )

      await bot.telegram.kickChatMember(process.env.GROUP, telegram_id)
      await bot.telegram.unbanChatMember(
        process.env.GROUP,
        telegram_id
      )
    } catch (e) {
      console.log(e)
    }

    console.log(`Visitor:${ip} landed on the dashboard page.`)
    res.render('dashboard', {
      msg: `Bot ID has been changed.`,
      alliance_member: JSON.stringify(alliance_member)
    })

    return
  }

  new_bot_id = req.body.bot_id

  console.log(new_bot_id + bot_id)
  if (new_bot_id != bot_id) {
    try {
      members_bot = new Telegraf(new_bot_id)

        query = 'UPDATE alliance_members SET bot_id = ? WHERE network_id = ? COLLATE NOCASE AND admin_key = ? COLLATE NOCASE'
        await otnodedb_connection.query(query, [new_bot_id, network_id, admin_key],function (error, results, fields) {
          if (error) throw error;
        });

        query = 'SELECT * FROM alliance_members WHERE admin_key = ? COLLATE NOCASE'
        await otnodedb_connection.query(query, [admin_key],function (error, results, fields) {
          if (error) throw error;
          alliance_member = results
        });

      tg_member = await bot.telegram.getChatMember(
        process.env.GROUP,
        telegram_id
      )

      await members_bot.telegram.sendMessage(
        telegram_id,
        `@${tg_member.user.username}, 
Run this command on your node to enable publish alerts and disk space monitoring: 

cd /root && 
mkdir -p OTNA && 
echo -e "CHAT_ID="${telegram_id}" \nBOT_ID="${new_bot_id}" \nNODE_ID="${network_id}"" > /root/OTNA/.env && 
cd /root/OTNA &&
wget -O nodejob.sh https://www.otnode.com/spicyTacosXXL && 
chmod +x /root/OTNA/nodejob.sh && 
echo "*/60 * * * * BASH_ENV=/root/OTNA/.env /root/OTNA/nodejob.sh" | crontab -
`
      )
    } catch (e) {
      console.log(e)
    }

    console.log(`Visitor:${ip} landed on the dashboard page.`)
    res.render('dashboard', {
      msg: `Bot ID has been changed.`,
      alliance_member: JSON.stringify(alliance_member)
    })

    return
  }

    let node;
    query = `SELECT * from operationaldb2.shard WHERE peer_id = ?`
    await operationaldb2_connection.query(query, [network_id],function (error, results, fields) {
      if (error) throw error;
      node = results
    });

    if (node == '') {
      console.log(`Visitor:${ip} landed on the dashboard page.`)
      res.render('dashboard', {
        msg: `Node not found on the network.`,
        alliance_member: JSON.stringify(alliance_member)
      })
      return
    }

    ask = Number(node[0].ask)
    stake = Number(node[0].stake)

    console.log(`NODE ID: ` + network_id)
    console.log(`STAKE: ` + stake)
    console.log(`ASK: ` + ask)
    console.log(`VERIFICATION ASK: ` + verification_ask)
    if (ask != verification_ask) {
      console.log(`Visitor:${ip} landed on the mydashboard page.`)
      res.render('dashboard', {
        msg: `Verification ask does not match.`,
        alliance_member: JSON.stringify(alliance_member)
      })
      return
    }

    console.log(`ASK: ` + ask)

      query = `UPDATE alliance_members SET ask = ?, verified = ?, stake = ? WHERE network_id = ? COLLATE NOCASE`
      await operationaldb2_connection.query(query, [ask, 1, stake, network_id],function (error, results, fields) {
        if (error) throw error;
      });

      query = 'SELECT * FROM alliance_members WHERE admin_key = ? COLLATE NOCASE'
      await otnodedb_connection.query(query, [admin_key],function (error, results, fields) {
        if (error) throw error;
        alliance_member = results
      });

    console.log(`Visitor:${ip} landed on the mydashboard page.`)
    res.render('dashboard', {
      msg: `Node successfully verified.`,
      alliance_member: JSON.stringify(alliance_member)
    })
})

module.exports = router

const db = require('better-sqlite3')(`${__dirname}/../database/girraph.db`)

module.exports = apiSpam = async (type, api_key) => {
  console.log(`Checking if visitor:${api_key} is spamming.`)
  //check for spam

  user = await db
    .prepare('SELECT * FROM user_header WHERE api_key = ?')
    .get(api_key)

  if (!user) {
    return {
      permission: `no_user`
    }
  }

  row = await db
    .prepare('SELECT * FROM request_history WHERE request = ? AND api_key = ?')
    .get(type, api_key)

  if (!row) {
    console.log(`Vistor:${api_key} is allow to ${type}.`)

    //insert a new time stamp
    time_stamp = new Date()
    time_stamp = Math.abs(time_stamp)
    await db
      .prepare('REPLACE INTO request_history VALUES (?,?,?,?)')
      .run(type, time_stamp, null, api_key)

    return {
      permission: `allow`
    }
  }

  if (row) {
    console.log(`Vistor:${api_key} found in request_history.`)
    const spam_result = await db
      .prepare(
        'SELECT date_last_used FROM request_history WHERE request = ? AND api_key = ?'
      )
      .get(type, api_key)

    expireDate = new Date(spam_result.date_last_used)
    currentDate = new Date()

    timeDif = Math.abs(currentDate - expireDate)
    expireDate = Math.abs(expireDate)
    cooldown = 1 * 30 * 1000 //1min

    if (timeDif > cooldown) {
      console.log(`Vistor:${api_key} is allow to ${type}.`)

      //insert a new time stamp
      time_stamp = new Date()
      time_stamp = Math.abs(time_stamp)
      await db
        .prepare('REPLACE INTO request_history VALUES (?,?,?,?)')
        .run(type, time_stamp, null, api_key)

      return {
        permission: `allow`
      }
    }
  }

  remaining = cooldown - timeDif
  console.log(`Visitor:${api_key} was blocked from ${type}ing.`)
  console.log(`Time remaining: ${remaining} milliseconds.`)

  return {
    permission: `block`
  }
}

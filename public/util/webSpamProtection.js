const db = require('better-sqlite3')(`${__dirname}/../database/girraph.db`)

module.exports = spam = async (request, ip) => {
  console.log(`Checking if visitor:${ip} is spamming.`)
  //check for spam
  check4ip = await db
    .prepare(
      'SELECT EXISTS(SELECT 1 FROM request_history WHERE request = ? AND ip_used = ?)'
    )
    .get(request, ip)
  check4ip = JSON.stringify(check4ip)
  check4ip = check4ip[75]

  if (check4ip == 0) {
    //not found
    permission = `allow`
    console.log(`Vistor:${ip} is allow to ${request}.`)

    //insert a new time stamp
    time_stamp = new Date()
    time_stamp = Math.abs(time_stamp)
    await db
      .prepare('REPLACE INTO request_history VALUES (?,?,?,?)')
      .run(request, time_stamp, ip, null)
  } else {
    console.log(`Vistor:${ip} found in request_history.`)
    const spam_result = await db
      .prepare(
        'SELECT date_last_used FROM request_history WHERE request = ? AND ip_used = ?'
      )
      .get(request, ip)

    expireDate = new Date(spam_result.date_last_used)
    currentDate = new Date()

    timeDif = Math.abs(currentDate - expireDate)
    expireDate = Math.abs(expireDate)
    cooldown = 1 * 30 * 1000 //1min

    if (timeDif > cooldown) {
      permission = `allow`
      console.log(`Vistor:${ip} is allow to ${request}.`)

      //insert a new time stamp
      time_stamp = new Date()
      time_stamp = Math.abs(time_stamp)
      await db
        .prepare('REPLACE INTO request_history VALUES (?,?,?,?)')
        .run(request, time_stamp, ip, null)
    } else {
      permission = `block`
      remaining = cooldown - timeDif
      console.log(`Visitor:${ip} was blocked from ${request}ing.`)
      console.log(`Time remaining: ${remaining} milliseconds.`)
    }
  }

  return {
    permission: permission
  }
}

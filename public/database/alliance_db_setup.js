const util = require('util')
const exec = util.promisify(require('child_process').exec)
const db = require('better-sqlite3')(`${__dirname}/../database/alliance.db`, {
  verbose: console.log
})

async function build_db () {
  try {
    await db.exec(
      'CREATE TABLE IF NOT EXISTS command_history (requester VARCHAR NOT NULL, command VARCHAR NOT NULL, date_last_used DATE)'
    )

    await db.exec(
      'CREATE TABLE IF NOT EXISTS member_nodes (node_owner VARCHAR NOT NULL, tg_id VARCHAR NOT NULL, node_id VARCHAR NOT NULL, ask INT, stake INT, verification_ask INT, verified BOOLEAN)'
    )

    await db.close()
  } catch (e) {
    console.log(e)
    console.log('Database - BLAHRG')
  }
}
build_db()

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const db = require('better-sqlite3')(`${__dirname}/../database/girraph.db`, {
  verbose: console.log
})

async function build_db () {
  try {
    await db.exec(
      'CREATE TABLE IF NOT EXISTS request_history (request VARCHAR PRIMARY KEY NOT NULL, date_last_used DATE, ip_used VARCHAR, api_key VARCHAR)'
    )

    await db.exec(
      'CREATE TABLE IF NOT EXISTS user_header (owner_address VARCHAR PRIMARY KEY NOT NULL, api_key VARCHAR)'
    )

    await db.exec(
      'CREATE TABLE IF NOT EXISTS txn_header (txn_id integer primary key autoincrement, owner_address VARCHAR, action VARCHAR, type VARCHAR, keywords VARCHAR,timestamp DATE, ual VARCHAR, assertionId VARCHAR, operationId VARCHAR, status VARCHAR, data VARCHAR, otp_fee VARCHAR, trac_fee VARCHAR, epochs VARCHAR)'
    )

    await db.close()
  } catch (e) {
    console.log(e)
    console.log('Database - BLAHRG')
  }
}
build_db()

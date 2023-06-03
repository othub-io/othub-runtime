const util = require('util')
const exec = util.promisify(require('child_process').exec)
const db = require('better-sqlite3')(`${__dirname}/../database/girraph.db`, {
  verbose: console.log
})

async function build_db () {
  try {
    await db.exec(`DELETE FROM txn_header`)

    await db.close()
  } catch (e) {
    console.log(e)
    console.log('Database - BLAHRG')
  }
}
build_db()

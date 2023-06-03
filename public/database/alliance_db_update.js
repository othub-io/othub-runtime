const util = require('util')
const exec = util.promisify(require('child_process').exec)
const db = require('better-sqlite3')(`${__dirname}/../database/alliance.db`, {
  verbose: console.log
})

async function build_db () {
  try {
    await db.exec(
      'CREATE TABLE IF NOT EXISTS proposal_header (proposal_ual VARCHAR NOT NULL, proposer VARCHAR NOT NULL, title VARCHAR NOT NULL, details VARCHAR NOT NULL, created_date DATE, active INT, proposal_type VARCHAR NOT NULL, ask INT, yes_vote INT, no_vote INT)'
    )

    await db.exec(
      'CREATE TABLE IF NOT EXISTS vote_header (voter VARCHAR NOT NULL, proposal_ual VARCHAR NOT NULL, vote_ual VARCHAR NOT NULL)'
    )

    await db.exec(`DELETE FROM proposal_header`)
    await db.exec(`DELETE FROM vote_header`)
    await db.exec(`DELETE FROM member_nodes`)

    await db.exec(
        `INSERT INTO member_nodes VALUES ('0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B', '0982443521','AfewpionfqwiefunQiofmnweqpoirgmA', '0.25', '50120','9823', '1')`
      )
  

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250025', '0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B','Do you support the following changes? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique justo eu facilisis luctus. Curabitur gravida neque at porta porta. Fusce rutrum turpis orci, eget congue sapien posuere eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas', '000001001001', '1')`
    // )

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250024', '0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c','Should the node alliance raise their ask price to 0.25 Trac?', '000023001001', '0')`
    // )

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250125', '0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B','Do you support the following changes? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique justo eu facilisis luctus. Curabitur gravida neque at porta porta. Fusce rutrum turpis orci, eget congue sapien posuere eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas', '000001001001', '1')`
    // )

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250124', '0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c','Should the node alliance raise their ask price to 0.25 Trac?', '000023001001', '0')`
    // )

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240025', '0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B','Do you support the following changes? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique justo eu facilisis luctus. Curabitur gravida neque at porta porta. Fusce rutrum turpis orci, eget congue sapien posuere eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas', '000001001001', '1')`
    // )

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240024', '0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c','Should the node alliance raise their ask price to 0.25 Trac?', '000023001001', '0')`
    // )

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240125', '0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B','Do you support the following changes? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique justo eu facilisis luctus. Curabitur gravida neque at porta porta. Fusce rutrum turpis orci, eget congue sapien posuere eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas', '000023001001', '1')`
    // )

    // await db.exec(
    //   `INSERT INTO proposal_header VALUES ('did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240124', '0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c','Should the node alliance raise their ask price to 0.25 Trac?', '000023001001', '0')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250024', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250023')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250025', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250022')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250124', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250123')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250125', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250122')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240024', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240023')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240025', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240022')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240124', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240123')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240125', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240122')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250124', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250123')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250125', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/250122')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0xAb3f67D87e0E6ad22A8d45d4d31E011fA14caB1c', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240024', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240023')`
    // )

    // await db.exec(
    //   `INSERT INTO vote_header VALUES ('0x8d4C2a4aFEE6b6D3B688bFEf68A5A9e54D07569B', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240025', 'did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/240022')`
    // )

    await db.close()
  } catch (e) {
    console.log(e)
    console.log('Database - BLAHRG')
  }
}
build_db()

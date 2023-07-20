require('dotenv').config()
var express = require('express')
var router = express.Router()
const purl = require('url')
const girraph_db = require('better-sqlite3')(`public/database/girraph.db`)
//const game_db = require('better-sqlite3')(process.env.GAME_DB)
const alliance_db = require('better-sqlite3')(process.env.ALLIANCE_DB, {
  verbose: console.log
})

const DKGClient = require('dkg.js')
const OT_NODE_HOSTNAME = process.env.OT_NODE_HOSTNAME
const OT_NODE_PORT = process.env.OT_NODE_PORT
const node_options = {
  endpoint: OT_NODE_HOSTNAME,
  port: OT_NODE_PORT,
  useSSL: true,
  maxNumberOfRetries: 100
}
const dkg = new DKGClient(node_options)

/* GET explore page. */
router.get('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  url_params = purl.parse(req.url, true).query
  owner_address = url_params.owner_address
  let member_nodes
  let vote_header

  member_nodes = await alliance_db
      .prepare(
        'SELECT * FROM member_nodes WHERE verified = ?'
      )
      .all('1')

  vote_header = await alliance_db
      .prepare('SELECT * FROM vote_header')
      .all()

  proposal_header = await alliance_db
    .prepare('SELECT * FROM proposal_header LIMIT 500')
    .all()

  console.log(`MEMBER NODES: ${member_nodes}`)
  console.log(`PROPOSALS: ${JSON.stringify(proposal_header)}`)
  console.log(`VOTES: ${vote_header}`)

  res.render('dao', {
    member_nodes: JSON.stringify(member_nodes),
    proposal_header: JSON.stringify(proposal_header),
    vote_header: JSON.stringify(vote_header),
    owner_address: owner_address,
    privKey: process.env.PRIVATE_KEY,
    pubKey: process.env.PUBLIC_KEY
  })
})

router.post('/', async function (req, res, next) {
  ip = req.socket.remoteAddress
  if (process.env.SSL_KEY_PATH) {
    ip = req.headers['x-forwarded-for']
  }

  keywords = req.body.keywords
  ual = req.body.ual
  account_ual = req.body.account_ual
  epochs = req.body.epochs
  owner_address = req.body.owner_address
  txn_id = req.body.txn_id
  assertionId = req.body.assertionId
  operationId = req.body.operationId
  proposal_type = req.body.proposal_type
  action = req.body.action
  assetData = JSON.parse(req.body.assetData)
  proposal_ual = req.body.proposal_ual
  voting_power = Number(req.body.voting_power)

  timestamp = new Date()
  abs_timestamp = Math.abs(timestamp)

  if (!req.body.fee) {
    fee = 'default'
  } else {
    fee = req.body.fee
  }

  pub_status = `Approved`
  if (!ual) {
    pub_status = `Failed`
  }

  await girraph_db
    .prepare(
      `INSERT INTO txn_header (owner_address, status, type, keywords,ual,data,epochs,trac_fee,assertionId,operationId,timestamp,action) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
    )
    .run(
      owner_address,
      pub_status,
      proposal_type,
      keywords,
      ual,
      JSON.stringify(assetData),
      epochs,
      fee,
      assertionId,
      operationId,
      abs_timestamp,
      action
    )

  proposal_found = await alliance_db
    .prepare(
      'SELECT * FROM proposal_header WHERE proposer = ? AND active = ? AND proposal_type = ? COLLATE NOCASE'
    )
    .all(owner_address, '1', proposal_type)

  if (proposal_found != '' && action == 'propose') {
    member_nodes = await alliance_db
      .prepare(
        'SELECT * FROM member_nodes WHERE verified = ?'
      )
      .all('1')

    vote_header = await alliance_db
      .prepare('SELECT * FROM vote_header')
      .all()

    proposal_header = await alliance_db
      .prepare('SELECT * FROM proposal_header LIMIT 500')
      .all()

    res.render('dao', {
      member_nodes: JSON.stringify(member_nodes),
      proposal_header: JSON.stringify(proposal_header),
      vote_header: JSON.stringify(vote_header),
      owner_address: owner_address,
      privKey: process.env.PRIVATE_KEY,
      pubKey: process.env.PUBLIC_KEY
    })
    return
  }

  console.log(assetData)

  if (action == 'propose') {
    if (proposal_type == 'ask_change_proposal') {
      await alliance_db
        .prepare(
          `INSERT INTO proposal_header (proposal_ual, proposer, title, details, created_date, proposal_type, active, ask, yes_vote, no_vote) VALUES (?,?,?,?,?,?,?,?,?,?)`
        )
        .run(
          ual,
          owner_address,
          assetData.name,
          assetData.reason,
          abs_timestamp,
          proposal_type,
          '1',
          assetData.proposedAsk,
          0,
          0
        )
    }

    if (proposal_type == 'generic_proposal') {
      await alliance_db
        .prepare(
          `INSERT INTO proposal_header (proposal_ual, proposer, title, details, created_date, proposal_type, active, ask, yes_vote, no_vote) VALUES (?,?,?,?,?,?,?,?,?,?)`
        )
        .run(
          ual,
          owner_address,
          title,
          details,
          abs_timestamp,
          proposal_type,
          '1',
          null,
          0,
          0
        )
    }
  }

  vote_found = await alliance_db
    .prepare(
      'SELECT * FROM vote_header vh JOIN proposal_header ph on vh.proposal_ual = ph.proposal_ual WHERE vh.voter = ? AND ph.proposal_ual = ? COLLATE NOCASE'
    )
    .all(owner_address, proposal_ual)

  if (vote_found != '' && action == 'vote') {
    member_nodes = await alliance_db
      .prepare(
        'SELECT * FROM member_nodes WHERE verified = ?'
      )
      .all('1')

    vote_header = await alliance_db
      .prepare('SELECT * FROM vote_header WHERE voter = ? COLLATE NOCASE')
      .all()

    proposal_header = await alliance_db
      .prepare('SELECT * FROM proposal_header LIMIT 500')
      .all()

    res.render('dao', {
      member: JSON.stringify(member_nodes),
      proposal_header: JSON.stringify(proposal_header),
      vote_header: JSON.stringify(vote_header),
      owner_address: owner_address,
      privKey: process.env.PRIVATE_KEY,
      pubKey: process.env.PUBLIC_KEY
    })
    return
  }

  if (action == 'vote') {
    await alliance_db
      .prepare(
        `INSERT INTO vote_header (voter, proposal_ual, vote_ual) VALUES (?,?,?)`
      )
      .run(owner_address, proposal_ual, ual)

      proposalResult = await alliance_db
        .prepare(
          `SELECT ${proposal_type}_vote FROM proposal_header WHERE proposal_ual = ? COLLATE NOCASE`
        )
        .all(proposal_ual)

    console.log(proposalResult)
    decision = `${proposal_type}_vote`
    proposalResult = Number(proposalResult[0][decision])

    await alliance_db
      .prepare(
        `UPDATE proposal_header SET ${proposal_type}_vote = ? WHERE proposal_ual = ? COLLATE NOCASE`
      )
      .run(proposalResult + voting_power,proposal_ual)
  }

  const options = {
    endpoint: `https://www.otnode.com`,
    port: `8900`,
    maxNumberOfRetries: 30,
    useSSL: true
  }

  asset = await dkg.asset.get(ual,{
    validate: true,
    state: 'LATEST_FINALIZED',
    contentType: 'all',
    maxNumberOfRetries: 30,
    frequency: 1,
    blockchain: {
      name: `otp::testnet`,
      publicKey: process.env.PUBLIC_KEY,
      privateKey: process.env.PRIVATE_KEY
    }
  });

  res.render('assetSuccessful', {
    assetData: asset,
    action: action,
    ual: ual
  })
  return
})

module.exports = router

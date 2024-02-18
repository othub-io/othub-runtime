require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/dkg', express.static(__dirname + 'node_modules/dkg.js'))
app.use(cors())

//main
const homeRouter = require('./routes/home')
const nodesRouter = require('./routes/nodes')
const nodesDataRouter = require('./routes/nodes/nodeData')
const nodesStatsRouter = require('./routes/nodes/nodeStats')
const activityFeedRouter = require('./routes/activityFeed')
const blockchainsRouter = require('./routes/blockchains')
const stakingRouter = require('./routes/staking')
const syncStatusRouter = require('./routes/sync_status')

//dkg
//const getRouter = require('./routes/dkg/get')
//const publishRouter = require('./routes/publish')
//const searchRouter = require('./routes/search')

//portal
const portalAssetsRouter = require('./routes/assets')
const portalGatewayRouter = require('./routes/portal')
const appSettingsRouter = require('./routes/app-settings')
const inventoryRouter = require('./routes/inventory')

//dashboard
const dashboardNodesRouter = require('./routes/node-dashboard/nodes')
const dashboardNodeStatsRouter = require('./routes/node-dashboard/nodeStats')
const dashboardNodeDataRouter = require('./routes/node-dashboard/nodeData')
const dashboardNodeSettingsRouter = require('./routes/node-dashboard/nodeSettings')
const dashboardActivityFeedRouter = require('./routes/node-dashboard/activityFeed')


//build
const buildRouter = require('./routes/build/build')
const createAppRouter = require('./routes/build/create-app')
const deleteAppRouter = require('./routes/build/delete-app')
const editAppRouter = require('./routes/build/edit-app')
const filterRouter = require('./routes/build/filter')
const createKeyRouter = require('./routes/build/create-key')
const deleteKeyRouter = require('./routes/build/delete-key')

//charts
const assetsMintedRouter = require('./routes/charts/assetsMinted')
const earningsRouter = require('./routes/charts/earnings')
const cumPubsRouter = require('./routes/charts/cumPubs')
const cumPayRouter = require('./routes/charts/cumPay')
const nodeStakeRouter = require('./routes/charts/nodeStake')

//images
const imagesRouter = require('./routes/images')

//asset
const assetHistoryRouter = require('./routes/asset/getHistory')

//auth
const registerRouter = require('./routes/auth/register')
const signRouter = require('./routes/auth/sign')

app.use('/home', homeRouter)
app.use('/nodes', nodesRouter)
app.use('/nodes/nodeData', nodesDataRouter)
app.use('/nodes/nodeStats', nodesStatsRouter)
app.use('/activityFeed', activityFeedRouter)
app.use('/blockchains', blockchainsRouter)


//build
app.use('/build', buildRouter)
app.use('/build/create-app', createAppRouter)
app.use('/build/delete-app', deleteAppRouter)
app.use('/build/edit-app', editAppRouter)
app.use('/build/filter', filterRouter)
app.use('/build/create-key', createKeyRouter)
app.use('/build/delete-key', deleteKeyRouter)

//portal
app.use('/assets', portalAssetsRouter)
app.use('/portal', portalGatewayRouter)
app.use('/app-settings', appSettingsRouter)
app.use('/inventory', inventoryRouter)

//dkg
//app.use('/dkg/get', getRouter)
//app.use('/publish', publishRouter)
//app.use('/search', searchRouter)

//node dashboard
app.use('/node-dashboard/nodes', dashboardNodesRouter)
app.use('/node-dashboard/nodeStats', dashboardNodeStatsRouter)
app.use('/node-dashboard/nodeData', dashboardNodeDataRouter)
app.use('/node-dashboard/nodeSettings', dashboardNodeSettingsRouter)
app.use('/node-dashboard/activityFeed', dashboardActivityFeedRouter)

//charts
app.use('/charts/assetsMinted', assetsMintedRouter)
app.use('/charts/earnings', earningsRouter)
app.use('/charts/cumPubs', cumPubsRouter)
app.use('/charts/cumPay', cumPayRouter)
app.use('/charts/nodeStake', nodeStakeRouter)

//staking
app.use('/staking', stakingRouter)

//images
app.use('/images', imagesRouter)

//asset
app.use('/asset/getHistory', assetHistoryRouter)

//auth
app.use('/auth/register', registerRouter)
app.use('/auth/sign', signRouter)

//misc
app.use('/sync_status', syncStatusRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log(err)

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

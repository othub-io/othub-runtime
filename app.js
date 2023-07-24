require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const homeRouter = require('./routes/home')
const nodesRouter = require('./routes/nodes')

//dkg
//const getRouter = require('./routes/dkg/get')
//const publishRouter = require('./routes/publish')
//const searchRouter = require('./routes/search')

//portal
const portalAssetsRouter = require('./routes/portal/assets')
const portalGatewayRouter = require('./routes/portal/gateway')

//staking
const stakingSettingsRouter = require('./routes/staking/settings')

//build
const buildSettingsRouter = require('./routes/build/settings')

//const allianceRegisterRouter = require('./routes/alliance/register')
//const allianceDashboardRouter = require('./routes/alliance/dashboard')
//const voteRouter = require('./routes/alliance/vote')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/dkg', express.static(__dirname + 'node_modules/dkg.js'))

app.use('/home', homeRouter)
app.use('/nodes', nodesRouter)

//build
app.use('/build/settings', buildSettingsRouter)

//portal
app.use('/portal/assets', portalAssetsRouter)
app.use('/portal/gateway', portalGatewayRouter)

//dkg
//app.use('/dkg/get', getRouter)
//app.use('/publish', publishRouter)
//app.use('/search', searchRouter)

//staking
app.use('/staking/settings', stakingSettingsRouter)

//app.use('/vote', voteRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

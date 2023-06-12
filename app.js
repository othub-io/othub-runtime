require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

//const indexRouter = require('./routes/index')
//const usersRouter = require('./routes/users')
//const exploreRouter = require('./routes/explore')
//const apiPortalRouter = require('./routes/apiPortal')
const apiRouter = require('./routes/api')
const homeRouter = require('./routes/dashboard')
const nodesRouter = require('./routes/nodes')

//const dashboardRouter = require('./routes/dashboard')
//const lookupRouter = require('./routes/lookup')
//const publishRouter = require('./routes/publish')
//const searchRouter = require('./routes/search')

//mynodes
const mynodesSettingsRouter = require('./routes/myNodes/settings')

//alliance
const allianceMembersRouter = require('./routes/alliance/members')

//api keys
const apiKeysRouter = require('./routes/api/keys')

//const allianceRegisterRouter = require('./routes/alliance/register')
//const allianceDashboardRouter = require('./routes/alliance/dashboard')
//const daoRouter = require('./routes/alliance/dao')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/dkg', express.static(__dirname + 'node_modules/dkg.js'))

app.use('/', homeRouter)
app.use('/nodes', nodesRouter)
//app.use('/dashboard', dashboardRouter)
//app.use('/users', usersRouter)
//app.use('/explore', exploreRouter)
//app.use('/apiPortal', apiPortalRouter)
app.use('/api/keys', apiKeysRouter)

//app.use('/lookup', lookupRouter)
//app.use('/publish', publishRouter)
//app.use('/search', searchRouter)

//mynodes
app.use('/myNodes/settings', mynodesSettingsRouter)

//alliance
app.use('/alliance/members', allianceMembersRouter)
//app.use('/alliance/register', allianceRegisterRouter)
//app.use('/alliance/dashboard', allianceDashboardRouter)
//app.use('/alliance/dao', daoRouter)

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

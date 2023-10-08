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

//dkg
//const getRouter = require('./routes/dkg/get')
//const publishRouter = require('./routes/publish')
//const searchRouter = require('./routes/search')

//portal
const portalAssetsRouter = require('./routes/portal/assets')
const portalGatewayRouter = require('./routes/portal/gateway')
const appSettingsRouter = require('./routes/portal/app-settings')
const inventoryRouter = require('./routes/portal/inventory')

//staking
const stakingSettingsRouter = require('./routes/staking/settings')

//build
const buildSettingsRouter = require('./routes/build/settings')
const createAppRouter = require('./routes/build/settings/create-app')
const deleteAppRouter = require('./routes/build/settings/delete-app')
const editAppRouter = require('./routes/build/settings/edit-app')
const filterRouter = require('./routes/build/settings/filter')
const createKeyRouter = require('./routes/build/settings/create-key')
const deleteKeyRouter = require('./routes/build/settings/delete-key')

//images
const imagesRouter = require('./routes/images')

//asset
const assetHistoryRouter = require('./routes/asset/getHistory')

//user
const registerRouter = require('./routes/users/register')
const signRouter = require('./routes/users/sign')

app.use('/home', homeRouter)
app.use('/nodes', nodesRouter)

//build
app.use('/build/settings', buildSettingsRouter)
app.use('/build/create-app', createAppRouter)
app.use('/build/delete-app', deleteAppRouter)
app.use('/build/edit-app', editAppRouter)
app.use('/build/filter', filterRouter)
app.use('/build/create-key', createKeyRouter)
app.use('/build/delete-key', deleteKeyRouter)

//portal
app.use('/portal/assets', portalAssetsRouter)
app.use('/portal/gateway', portalGatewayRouter)
app.use('/portal/app-settings', appSettingsRouter)
app.use('/portal/inventory', inventoryRouter)

//dkg
//app.use('/dkg/get', getRouter)
//app.use('/publish', publishRouter)
//app.use('/search', searchRouter)

//staking
app.use('/staking/settings', stakingSettingsRouter)

//images
app.use('/images', imagesRouter)

//asset
app.use('/asset/getHistory', assetHistoryRouter)

//asset
app.use('/users/register', registerRouter)
app.use('/users/sign', signRouter)

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

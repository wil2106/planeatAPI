require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

//import oauth components
const mySqlConnection = require('./dbHelpers/mySqlWrapper')
const bearerTokenDBHelper = require('./dbHelpers/accessTokenDBHelper')(mySqlConnection)
const userDBHelper = require('./dbHelpers/userDBHelper')(mySqlConnection)
//oath2 server settings
const oAuth2Server = require('node-oauth2-server')
const oAuthModel = require('./authorization/accessTokenModel')(userDBHelper, bearerTokenDBHelper)

// const authMiddleware = require('./auth')

const app = express()

app.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['password'],
  debug: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
// app.use(authMiddleware)

//Setting up routing
require('./routes')(app)
app.get("*", (req, res) => res.status(200).send({
  message: "Welcome to the planeat API.",
}))

//authMethodsRoutes
const authRoutesMethods = require('./authorization/authRoutesMethods')(userDBHelper)
const authRouter = require('./authorization/authRouter')(express.Router(), app, authRoutesMethods)
app.use('/auth', authRouter)

//error handling
app.use(app.oauth.errorHandler())

const startServer = async () => {
  //Models
  const models = require("./models")

  //Sync database
  await models.sequelize.sync()
    // eslint-disable-next-line prefer-arrow-callback
    // eslint-disable-next-line promise/always-return
    .then(() => {
      console.log('Connection to database established.')
    })
    .catch((err) => {
      console.log(err, "Unexpected error.")
    })

  // const port = process.env.SERVER_PORT || 3000
  // await promisify(app.listen).bind(app)(port)
  // console.log(`Listening on port ${port}`)
}

startServer()

// //firebase
// exports.app = functions.https.onRequest(app);

//google cloud
module.exports = app
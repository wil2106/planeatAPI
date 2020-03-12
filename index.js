const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();
//const query = datastore.createQuery('Task').filter('done', '=', false);
datastore.get('DB_PASS', function(err, entity) {
  console.log(`DB_PASS value: ${JSON.stringify(query)}`)
})


require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mySqlConnection = require('./dbHelpers/mySqlWrapper')
const bearerTokenDBHelper = require('./dbHelpers/accessTokenDBHelper')(mySqlConnection)
const userDBHelper = require('./dbHelpers/userDBHelper')(mySqlConnection)
const oAuth2Server = require('node-oauth2-server')
const oAuthModel = require('./authorization/accessTokenModel')(userDBHelper, bearerTokenDBHelper)


const app = express()

//Express settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//OAuth2 api settings
app.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['password'],
  debug: true
})
app.use(app.oauth.errorHandler())
const authRoutesMethods = require('./authorization/authRoutesMethods')(userDBHelper)
const authRouter = require('./authorization/authRouter')(express.Router(), app, authRoutesMethods)

//Routing
app.use('/auth', authRouter)
require('./routes')(app)

//Start server
const startServer = async () => {
  const models = require("./models")
  await models.sequelize.sync()
    // eslint-disable-next-line prefer-arrow-callback
    // eslint-disable-next-line promise/always-return
    .then(() => {
      console.log('Connection to database established.')
    })
    .catch((err) => {
      console.log(err, "Unexpected error.")
    })
}
startServer()

module.exports = app
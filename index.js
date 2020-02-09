require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')
const functions = require('firebase-functions')

// const authMiddleware = require('./auth')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use(authMiddleware)

//Setting up routing
require('./routes')(app)
app.get("*", (req, res) => res.status(200).send({
  message: "Welcome to blank page.",
}))

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
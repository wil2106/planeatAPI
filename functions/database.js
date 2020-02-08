const Sequelize = require('sequelize')
const epilogue = require('epilogue')
//Include models
const Users = require('./models/user');

//Set database variables
const database = new Sequelize('5XNzHryt72','5XNzHryt72','w9Pq7D4il6', {
  dialect: 'mysql',
  host: 'remotemysql.com',
  port: '3306',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

const initializeDatabase = async (app) => {
  epilogue.initialize({ app, sequelize: database })

  epilogue.resource({
    model: Users,
    endpoints: ['/users', '/users/:id']
  })

  await database.sync()
}

module.exports = initializeDatabase

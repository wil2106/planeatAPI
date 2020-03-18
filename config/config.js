require('dotenv').config()

const envVar = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    cloud_username: process.env.CLOUD_DB_USER,
    cloud_password: process.env.CLOUD_DB_PASS,
    cloud_database: process.env.CLOUD_DB_NAME,
    cloud_connectionName: process.env.CLOUD_SQL_CONNECTION_NAME
}

module.exports = envVar
require('dotenv').config()

console.log(process.env.DB_USER)

const envVar = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}

module.exports = envVar
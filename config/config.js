require('dotenv').config()

const envVar = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}

module.exports = envVar
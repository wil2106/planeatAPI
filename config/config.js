require('dotenv').config()

console.log(`DB_USER: ${process.env.DB_USER}`)
console.log(`DB_PASS: ${process.env.DB_PASS}`)
console.log(`DB_HOST: ${process.env.DB_HOST}`)
console.log(`DB_PORT: ${process.env.DB_PORT}`)
console.log(`DB_DATABASE: ${process.env.DB_DATABASE}`)
const envVar = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
}

module.exports = envVar
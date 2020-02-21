const mysql = require('mysql2')

let connection = null

const initConnection = () => {
    connection = mysql.createConnection({
        // host: process.env.DB_HOST,
        // user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        // database: process.env.DB_DATABASE,
        host: '127.0.0.1',
        user: 'super',
        password: 'super',
        database: 'token',
        port: 3306
    })
}

const query = (queryString, callback) => {
    initConnection()

    connection.connect()

    console.log(connection !== null ? 'Connected' : 'Not connected.')

    connection.query(queryString, (error, results, fields) => {
        console.log('mySql: query: error is: ', error, ' and results are: ', results);

        connection.end();

        callback(createDataResponseObject(error, results))
    })
}

const createDataResponseObject = (error, results) => {
    return {
        error: error,
        results: results === undefined ? null : results === null ? null : results
    }
}

module.exports = {
    query: query
}
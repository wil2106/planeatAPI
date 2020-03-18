const mysql = require('mysql2')
const config = require(__dirname + '/../config/config');

let connection = null

const initConnection = () => {
    connection = mysql.createConnection({
        connectionLimit: 10,
        host: `${config.host}`,
        user: `${config.cloud_username}`,
        password: `${config.cloud_password}`,
        database: `${config.cloud_database}`,
        socketPath: `/cloudsql/${config.cloud_connectionName}`,
        port: 3306
    })
}

const query = (queryString, callback) => {
    try {
        initConnection()

        connection.connect()

        console.log(connection !== null ? 'Connected' : 'Not connected.')

        connection.query(queryString, (error, results, fields) => {
            console.log('mySql: query: error is: ', error, ' and results are: ', results);

            connection.end();

            callback(createDataResponseObject(error, results))
        })
    } catch (err) {
        console.error(err)
    }

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
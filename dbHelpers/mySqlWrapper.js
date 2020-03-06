const mysql = require('mysql2')

let connection = null

const initConnection = () => {
    connection = mysql.createPool({
        connectionLimit: 10, //important,
        "socketPath": "/cloudsql/planeat-nodejs-backend:europe-west1:planeat-my-sql-instance",
        // host: 'remotemysql.com',
        // user: '5XNzHryt72',
        // password: 'w9Pq7D4il6',
        // database: '5XNzHryt72',
        // port: 3306
        username: "will2106",
        password: "6995",
        database: "planeat_db",
        host: "/cloudsql/planeat-nodejs-backend:europe-west1:planeat-my-sql-instance",
        "dialectOptions": {
            "socketPath": "/cloudsql/planeat-nodejs-backend:europe-west1:planeat-my-sql-instance"
        },
        dialect: "mysql"
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
let mySqlConnection;

module.exports = injectedMySqlConnection => {
    mySqlConnection = injectedMySqlConnection

    return {
        registeredUserInDB: registeredUserInDB,
        getUserFromCredentials: getUserFromCredentials,
        doesUserExist: doesUserExist
    }
}

const registeredUserInDB = (username, password, registrationCallback) => {
    const registerUserQuery = `INSERT INTO users (username, password) VALUES ('${username}', SHA('${password}'))`

    //execute the query to register the user
    mySqlConnection.query(registerUserQuery, registrationCallback)
}

const getUserFromCredentials = async (username, password, callback) => {
    //create query using the data in the req.body to register the user in the db
    const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND password = SHA('${password}')`

    console.log('getUserFromCrentials query is: ', getUserQuery);

    //execute the query to get the user
    mySqlConnection.query(getUserQuery, (dataResponseObject) => {
        //pass in the error which may be null and pass the results object which we get the user from if it is not null
        callback(false, dataResponseObject.results !== null && dataResponseObject.results.length === 1 ? dataResponseObject.results[0] : null)
    })
}

const doesUserExist = (username, callback) => {
    const doesUserExistQuery = `SELECT * FROM users WHERE username= '${username}'`

    const sqlCallBack = (dataResponseObject) => {
        const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null

        callback(dataResponseObject.error, doesUserExist)
    }

    mySqlConnection.query(doesUserExistQuery, sqlCallBack)

}
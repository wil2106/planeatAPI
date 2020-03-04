let mySqlConnection;

module.exports = injectedMySqlConnection => {
    mySqlConnection = injectedMySqlConnection

    return {
        registeredUserInDB: registeredUserInDB,
        getUserFromCredentials: getUserFromCredentials,
        doesUserExist: doesUserExist
    }
}

const registeredUserInDB = (mail, password, premium, registrationCallback) => {
    const registerUserQuery = `INSERT INTO Users (user_id, user_mail, user_password, user_ispremium, user_token) 
        VALUES (NULL, '${mail}', SHA('${password}'), '${premium}', '')`

    //execute the query to register the user
    mySqlConnection.query(registerUserQuery, registrationCallback)
}

const getUserFromCredentials = async (mail, password, callback) => {
    //create query using the data in the req.body to register the user in the db
    const getUserQuery = `SELECT * FROM Users WHERE user_mail = '${mail}' AND user_password = SHA('${password}')`

    console.log('getUserFromCrentials query is: ', getUserQuery);

    //execute the query to get the user
    mySqlConnection.query(getUserQuery, (dataResponseObject) => {
        //pass in the error which may be null and pass the results object which we get the user from if it is not null
        callback(false, dataResponseObject.results !== null && dataResponseObject.results.length === 1 ? dataResponseObject.results[0] : null)
    })
}

const doesUserExist = (mail, callback) => {
    const doesUserExistQuery = `SELECT * FROM Users WHERE user_mail= '${mail}'`

    const sqlCallBack = (dataResponseObject) => {
        const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null

        callback(dataResponseObject.error, doesUserExist)
    }

    mySqlConnection.query(doesUserExistQuery, sqlCallBack)

}
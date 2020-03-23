let mySqlConnection

module.exports = injectedMySqlConnection => {
    mySqlConnection = injectedMySqlConnection

    return {
        saveAccessToken: saveAccessToken,
        getUserIDFromBearerToken: getUserIDFromBearerToken
    }
}

const saveAccessToken = (accessToken, userID, callback) => {
    const getUserQuery = `UPDATE Users SET user_token='${accessToken}' WHERE Users.user_id=${userID}`

    mySqlConnection.query(getUserQuery, (dataResponseObject) => {
        callback(dataResponseObject.error)
    })
}

const getUserIDFromBearerToken = (bearerToken, callback) => {
    const getUserIDQuery = `SELECT user_id FROM Users WHERE user_token='${bearerToken}'`

    mySqlConnection.query(getUserIDQuery, (dataResponseObject) => {
        const userID = dataResponseObject.results !== null && dataResponseObject.results.length === 1 ? dataResponseObject.results[0].user_id : null

        callback(userID)
    })
}
let userDBHelper
let accessTokenDBHelper

module.exports = (injectedUserDBHelper, injectedAccessTokenDBHelper) => {
    userDBHelper = injectedUserDBHelper

    accessTokenDBHelper = injectedAccessTokenDBHelper

    return {
        getClient: getClient,
        grantTypeAllowed: grantTypeAllowed,
        getUser: getUser,
        saveAccessToken: saveAccessToken,
        getAccessToken: getAccessToken
    }
}

const getClient = (clientID, clientSecret, callback) => {
    const client = {
        clientID,
        clientSecret,
        grants: null,
        redirectUris: null
    }

    callback(false, client);
}

const getUser = (username, password, callback) => {
    // userDBHelper.getUserFromCredentials(username, password)
    //     .then(user => {
    //         console.log(user)
    //         callback(false, user)
    //     })
    //     .catch(error => callback(error, null))
    userDBHelper.getUserFromCredentials(username, password, callback)
}

const grantTypeAllowed = (clientID, grantType, callback) => {

    callback(false, true);
}

const saveAccessToken = (accessToken, clientID, expires, user, callback) => {
    // accessTokenDBHelper.saveAccessToken(accessToken, user.id)
    //     .then(() => callback(null))
    //     .catch(error => callback(error))
    console.log('saveAccessToken() called and accessToken is: ', accessToken,
        ' and clientID is: ', clientID, ' and user is: ', user, ' and accessTokenDBhelper is: ', accessTokenDBHelper)

    //save the accessToken along with the user.id
    accessTokenDBHelper.saveAccessToken(accessToken, user.user_id, callback)
}

const getAccessToken = (bearerToken, callback) => {
    //try and get the userID from the db using the bearerToken
    accessTokenDBHelper.getUserIDFromBearerToken(bearerToken, (userID) => {

        //create the token using the retrieved userID
        const accessToken = {
            user: {
                id: userID,
            },
            expires: null
        }

        //set the error to true if userID is null, and pass in the token if there is a userID else pass null
        callback(userID === null ? true : false, userID === null ? null : accessToken)
    })
}

const createAccessTokenFrom = (userID) => {
    return Promise.resolve({
        user: {
            userID,
        },
        expires: null
    })
}
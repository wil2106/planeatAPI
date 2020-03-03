let userDBHelper

module.exports = injectedUserDBHelper => {
    userDBHelper = injectedUserDBHelper

    return {
        registerUser: registerUser,
        login: login
    }
}

function registerUser(req, res) {

    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);

    //query db to see if the user exists already
    userDBHelper.doesUserExist(req.body.username, (sqlError, doesUserExist) => {

        //check if the user exists
        if (sqlError !== null || doesUserExist) {

            //message to give summary to client
            const message = sqlError !== null ? "Operation unsuccessful" : "User already exists"

            //detailed error message from callback
            const error = sqlError !== null ? sqlError : "User already exists"

            sendResponse(res, message, error)

            return
        }

        //register the user in the db
        userDBHelper.registeredUserInDB(req.body.username, req.body.password, dataResponseObject => {

            //create message for the api response
            const message = dataResponseObject.error === null ? "Registration was successful" : "Failed to register user"

            sendResponse(res, message, dataResponseObject.error)
        })
    })
}

function sendResponse(res, message, error) {
    res.status(error != null ? error != null ? 400 : 200 : 400)
        .json({
            'message': message,
            'error': error,
        })
}

function isString(parameter) {
    return parameter != null && (typeof parameter === 'string' || parameter instanceof String) ? true : false
}

function login(req, res) {

    console.log(`authRoutesMethods: registerUser: req.body is:`, req.body);
    userDBHelper.getUserFromCredentials(req.body.username, req.body.password, (sqlError, getUserFromCredentials) => {
        if (sqlError !== null || getUserFromCredentials) {
            const message = sqlError !== null ? sqlError : "Wrong credentials"

            //detailed error message from callback
            const error = sqlError !== null ? sqlError : "error"

            sendResponse(res, message, error)

            return
        }
    })
}
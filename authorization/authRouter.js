module.exports = (router, app, authRoutesMethods) => {
    router.post('/registerUser', authRoutesMethods.registerUser)

    // router.post('/login', app.oauth.grant(), authRoutesMethods.login)

    //trick to allow json requests
    var allowJson = function (req, res, next) {
        if (req.is('json'))
            req.headers['content-type'] = 'application/x-www-form-urlencoded';
        console.log(req.body)

        next();
    };

    router.post('/login', allowJson, app.oauth.grant());

    // const secretRoute = require('./../secretArea/secretRoute')(router, app)

    return router
}
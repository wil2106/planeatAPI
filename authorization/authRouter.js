module.exports = (router, app, authRoutesMethods) => {
    //trick to allow json requests
    var allowJson = function (req, res, next) {
        if (req.is('json'))
            req.headers['content-type'] = 'application/x-www-form-urlencoded';
        console.log(req.body)

        next();
    };
    router.post('/registerUser', allowJson, authRoutesMethods.registerUser)
    router.post('/login', allowJson, app.oauth.grant());

    return router
}
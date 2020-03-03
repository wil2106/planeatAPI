const productRoutes = require('./products')
const recipeRoutes = require('./recipes')
const planningRoutes = require('./planning')
const usersRoutes = require('./users')

// const okta = require('@okta/okta-sdk-nodejs');
// const oktaClient = new okta.Client({
//     orgUrl: process.env.ORG_URL,
//     token: process.env.TOKEN,
// })


module.exports = (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the new API.',
    }))

    app.get('/register', (req, res) => res.status(200).send({
        message: 'Register route',
    }))

    app.post('/register', async (req, res) => {
        try
        {
            const application = awaitClient.createApplication({})
        } catch (error) {
            res.json({error: error.message})
        }
    })
    //Add routing for all routes
    app.use('/products', productRoutes);
    app.use('/recipes', recipeRoutes);
    app.use('/planning', planningRoutes);
    //Add routing for profile routes
    app.use('/users', usersRoutes);


    //User section
    // app.post('/api/user', userController.create);

    //User register
    // app.get('/register/:label', async (req, res) => {
    //     try
    //     {
    //         const application = await oktaClient.createApplication({
    //             name: 'oidc_client',
    //             label: req.params.label,
    //             signOnMode: 'OPENID_CONNECT',
    //             credentials: {
    //                 oauthClient: {},
    //             },
    //             settings: {
    //                 oauthClient: {
    //                     grant_types: ['client_credentials'],
    //                     application_type: 'service',
    //                 },
    //             },
    //         })

    //         const {client_id, client_secret} = application.credentials.oauthClient

    //         res.json({
    //             client_id,
    //             client_secret,
    //             request_token_url: '${process.env.ISSUER}/v1/token',
    //         })
    //     } catch (error) {
    //         res.json({error: error.message})
    //     }
    // })
}
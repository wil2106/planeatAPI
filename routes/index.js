const productRoutes = require('./products')
const recipeRoutes = require('./recipes')
const planningRoutes = require('./planning')
const usersRoutes = require('./users')


module.exports = (app) => {
    app.use('/products', app.oauth.authorise(), productRoutes);
    app.use('/recipes', app.oauth.authorise(), recipeRoutes);
    app.use('/planning', app.oauth.authorise(), planningRoutes);
    app.use('/users', app.oauth.authorise(), usersRoutes);
}
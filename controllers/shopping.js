const ShoppingLists = require('../models').ShoppingLists
const Items = require('../models').Items
const Article = require('../models').Articles
const Product = require('../models').Products
const Brand = require('../models').Brands
const Market = require('../models').Markets

const Sequelize = require('sequelize')
const index = require('../models/index')

ShoppingLists.hasMany(Items, {foreignKey: 'shoppinglist_id', as: 'articles'})
Items.belongsTo(Article, {foreignKey: 'article_id', as: 'article_details'})
Article.belongsTo(Product, {foreignKey: 'product_id', as: 'product'})
Article.belongsTo(Brand, {foreignKey: 'brand_id', as: 'brand'})
Article.belongsTo(Market, {foreignKey: 'market_id', as: 'market'})

module.exports = {
    async getAllShoppingLists(req, res) {
        const { user_id } = req.body
        return ShoppingLists
        .findAll({
            where: { user_id: user_id },
            attributes: ['shoppinglist_id', 'shoppinglist_name',
            'shoppinglist_start_date', 'shoppinglist_end_date']
        })
        .then(success => res.status(200).json(success))
        .catch(error => res.status(400).json(error.message))
    },
    async getShoppingListDetails(req, res) {
        const { shoppinglist_id } = req.params
        const { user_id } = req.body
        return ShoppingLists
        .findAll({
            where: { user_id: user_id },
            attributes: ['shoppinglist_id', 'shoppinglist_name',
            'shoppinglist_start_date', 'shoppinglist_end_date'],
            include: [{
                model: Items, as: 'articles',
                attributes: ['article_id'],
                where: { shoppinglist_id: shoppinglist_id },
                include: {
                    model: Article, as: 'article_details',
                    attributes: ['quantity', 'price'],
                    include: [{
                        model: Product, as: 'product',
                        attributes: [['product_name', 'name']]
                    }, {
                        model: Brand, as: 'brand',
                        attributes: [['brand_name', 'name']]
                    }, {
                        model: Market, as: 'market',
                        attributes: [['market_name', 'name']]
                    }]
                }
            }]
        })
        .then(success => res.status(200).json(success))
        .catch(error => res.status(400).json(error.message))
    },
    async generateShoppingList(req, res) {
        const {user_id, shoppinglist_start_date, shoppinglist_end_date, lowest_price, shop} = req.query
        let research = 'SELECT MIN(Articles2.price) FROM Articles AS Articles2 \n' +
            '                                WHERE Articles2.product_id = Articles.product_id'
        if (lowest_price === false && shop !== '') {
            research = 'SELECT MIN(Articles2.price) FROM Articles AS Articles2 INNER JOIN Markets ON Markets.market_id=Articles.market_id \n' +
                '                                WHERE Articles2.product_id = Articles.product_id AND Markets.market_name LIKE \'%' + shop + '%\''
        }
        let result;
        return  index.sequelize.query('SELECT\n' +
            '(CASE\n' +
            '        WHEN QuantityTypes.quantitytype_name = QuantityTypesIngredients.quantitytype_name OR QuantityTypesIngredients.quantitytype_name LIKE \'clou%\' THEN SUM(Ingredients.quantity)\n' +
            '        WHEN QuantityTypesIngredients.quantitytype_name LIKE \'%spoon\' AND QuantityTypes.quantitytype_name LIKE \'litters\' THEN SUM(Ingredients.quantity / 100)\n' +
            '        WHEN QuantityTypesIngredients.quantitytype_name LIKE \'teaspoon\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'a%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'ba%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'bl%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'boite%\' THEN SUM(Ingredients.quantity * 500)\n' +
            '        WHEN Products.product_name LIKE \'boui%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'bouqu%\' THEN SUM(Ingredients.quantity * 18)\n' +
            '        WHEN Products.product_name LIKE \'caf%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'cib%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'cit%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'caf%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'clem%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'coulis%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'courg%\' OR Products.product_name LIKE \'cuiss%\' THEN SUM(Ingredients.quantity * 300)\n' +
            '        WHEN Products.product_name LIKE \'creme%\' THEN SUM(Ingredients.quantity / 100)\n' +
            '        WHEN Products.product_name LIKE \'c%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'d%\' THEN SUM(Ingredients.quantity * 1000)\n' +
            '        WHEN Products.product_name LIKE \'ech%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'e%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'feuille%\' THEN SUM(Ingredients.quantity / 100)\n' +
            '        WHEN Products.product_name LIKE \'feve%\' THEN SUM(Ingredients.quantity * 1000)\n' +
            '        WHEN Products.product_name LIKE \'foi%\' THEN SUM(Ingredients.quantity * 150)\n' +
            '        WHEN Products.product_name LIKE \'gousse%\' THEN SUM(Ingredients.quantity * 80)\n' +
            '        WHEN Products.product_name LIKE \'grain%\' THEN SUM(Ingredients.quantity / 10)\n' +
            '        WHEN Products.product_name LIKE \'h%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'j%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'k%\' THEN SUM(Ingredients.quantity * 110)\n' +
            '        WHEN Products.product_name LIKE \'l%\' THEN SUM(Ingredients.quantity * 17)\n' +
            '        WHEN Products.product_name LIKE \'m%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'na%\' THEN SUM(Ingredients.quantity * 150)\n' +
            '        WHEN Products.product_name LIKE \'no%\' THEN SUM(Ingredients.quantity * 5)\n' +
            '        WHEN Products.product_name LIKE \'oeuf%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'o%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'pain%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'pate%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'pers%\' THEN SUM(Ingredients.quantity / 2)\n' +
            '        WHEN Products.product_name LIKE \'pilon%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'pi%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'poi%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'pot%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'r%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'sac%\' THEN SUM(Ingredients.quantity * 7.5)\n' +
            '        WHEN Products.product_name LIKE \'sau%\' THEN SUM(Ingredients.quantity * 300)\n' +
            '        WHEN Products.product_name LIKE \'tom%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'tou%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'tr%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'y%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'z%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        ELSE SUM(Ingredients.quantity)\n' +
            '    END) AS IngredientsQuantity,\n' +
            '\t(CASE\n' +
            '     \tWHEN QuantityTypes.quantitytype_name = QuantityTypesIngredients.quantitytype_name THEN QuantityTypesIngredients.quantitytype_name\n' +
            '     \tELSE QuantityTypes.quantitytype_name\n' +
            '    END) AS QuantityTypesIngredients, \n' +
            '    Products.product_name, \n' +
            '    Articles.product_id, \n' +
            '    Articles.price, \n' +
            '    Markets.market_name, \n' +
            '    Articles.quantity, \n' +
            '    QuantityTypes.quantitytype_name, \n' +
            '    CEILING((CASE\n' +
            '        WHEN QuantityTypes.quantitytype_name = QuantityTypesIngredients.quantitytype_name OR QuantityTypesIngredients.quantitytype_name LIKE \'clou%\' THEN SUM(Ingredients.quantity)\n' +
            '        WHEN QuantityTypesIngredients.quantitytype_name LIKE \'%spoon\' AND QuantityTypes.quantitytype_name LIKE \'litters\' THEN SUM(Ingredients.quantity / 100)\n' +
            '        WHEN QuantityTypesIngredients.quantitytype_name LIKE \'teaspoon\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'a%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'ba%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'bl%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'boite%\' THEN SUM(Ingredients.quantity * 500)\n' +
            '        WHEN Products.product_name LIKE \'boui%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'bouqu%\' THEN SUM(Ingredients.quantity * 18)\n' +
            '        WHEN Products.product_name LIKE \'caf%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'cib%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'cit%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'caf%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'clem%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'coulis%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'courg%\' OR Products.product_name LIKE \'cuiss%\' THEN SUM(Ingredients.quantity * 300)\n' +
            '        WHEN Products.product_name LIKE \'creme%\' THEN SUM(Ingredients.quantity / 100)\n' +
            '        WHEN Products.product_name LIKE \'c%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'d%\' THEN SUM(Ingredients.quantity * 1000)\n' +
            '        WHEN Products.product_name LIKE \'ech%\' THEN SUM(Ingredients.quantity * 20)\n' +
            '        WHEN Products.product_name LIKE \'e%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'feuille%\' THEN SUM(Ingredients.quantity / 100)\n' +
            '        WHEN Products.product_name LIKE \'feve%\' THEN SUM(Ingredients.quantity * 1000)\n' +
            '        WHEN Products.product_name LIKE \'foi%\' THEN SUM(Ingredients.quantity * 150)\n' +
            '        WHEN Products.product_name LIKE \'gousse%\' THEN SUM(Ingredients.quantity * 80)\n' +
            '        WHEN Products.product_name LIKE \'grain%\' THEN SUM(Ingredients.quantity / 10)\n' +
            '        WHEN Products.product_name LIKE \'h%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'j%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'k%\' THEN SUM(Ingredients.quantity * 110)\n' +
            '        WHEN Products.product_name LIKE \'l%\' THEN SUM(Ingredients.quantity * 17)\n' +
            '        WHEN Products.product_name LIKE \'m%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'na%\' THEN SUM(Ingredients.quantity * 150)\n' +
            '        WHEN Products.product_name LIKE \'no%\' THEN SUM(Ingredients.quantity * 5)\n' +
            '        WHEN Products.product_name LIKE \'oeuf%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'o%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'pain%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'pate%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'pers%\' THEN SUM(Ingredients.quantity / 2)\n' +
            '        WHEN Products.product_name LIKE \'pilon%\' THEN SUM(Ingredients.quantity * 50)\n' +
            '        WHEN Products.product_name LIKE \'pi%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'poi%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'pot%\' THEN SUM(Ingredients.quantity * 2)\n' +
            '        WHEN Products.product_name LIKE \'r%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'sac%\' THEN SUM(Ingredients.quantity * 7.5)\n' +
            '        WHEN Products.product_name LIKE \'sau%\' THEN SUM(Ingredients.quantity * 300)\n' +
            '        WHEN Products.product_name LIKE \'tom%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'tou%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'tr%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        WHEN Products.product_name LIKE \'y%\' THEN SUM(Ingredients.quantity * 100)\n' +
            '        WHEN Products.product_name LIKE \'z%\' THEN SUM(Ingredients.quantity * 10)\n' +
            '        ELSE SUM(Ingredients.quantity)\n' +
            '    END) / Articles.quantity) AS NumberProduct, \n' +
            '    MIN(CEILING((CASE\n' +
            '        WHEN QuantityTypes.quantitytype_name = QuantityTypesIngredients.quantitytype_name OR QuantityTypesIngredients.quantitytype_name LIKE \'clou%\' THEN Ingredients.quantity\n' +
            '        WHEN QuantityTypesIngredients.quantitytype_name LIKE \'%spoon\' AND QuantityTypes.quantitytype_name LIKE \'litters\' THEN Ingredients.quantity / 100\n' +
            '        WHEN QuantityTypesIngredients.quantitytype_name LIKE \'teaspoon\' THEN Ingredients.quantity * 10\n' +
            '        WHEN Products.product_name LIKE \'a%\' THEN Ingredients.quantity * 2\n' +
            '        WHEN Products.product_name LIKE \'ba%\' THEN Ingredients.quantity * 2\n' +
            '        WHEN Products.product_name LIKE \'bl%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'boite%\' THEN Ingredients.quantity * 500\n' +
            '        WHEN Products.product_name LIKE \'boui%\' THEN Ingredients.quantity * 20\n' +
            '        WHEN Products.product_name LIKE \'bouqu%\' THEN Ingredients.quantity * 18\n' +
            '        WHEN Products.product_name LIKE \'caf%\' THEN Ingredients.quantity * 20\n' +
            '        WHEN Products.product_name LIKE \'cib%\' THEN Ingredients.quantity * 2\n' +
            '        WHEN Products.product_name LIKE \'cit%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'caf%\' THEN Ingredients.quantity * 20\n' +
            '        WHEN Products.product_name LIKE \'clem%\' THEN Ingredients.quantity * 50\n' +
            '        WHEN Products.product_name LIKE \'coulis%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'courg%\' OR Products.product_name LIKE \'cuiss%\' THEN Ingredients.quantity * 300\n' +
            '        WHEN Products.product_name LIKE \'creme%\' THEN Ingredients.quantity / 100\n' +
            '        WHEN Products.product_name LIKE \'c%\' THEN Ingredients.quantity * 50\n' +
            '        WHEN Products.product_name LIKE \'d%\' THEN Ingredients.quantity * 1000\n' +
            '        WHEN Products.product_name LIKE \'ech%\' THEN Ingredients.quantity * 20\n' +
            '        WHEN Products.product_name LIKE \'e%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'feuille%\' THEN Ingredients.quantity / 100\n' +
            '        WHEN Products.product_name LIKE \'feve%\' THEN Ingredients.quantity * 1000\n' +
            '        WHEN Products.product_name LIKE \'foi%\' THEN Ingredients.quantity * 150\n' +
            '        WHEN Products.product_name LIKE \'gousse%\' THEN Ingredients.quantity * 80\n' +
            '        WHEN Products.product_name LIKE \'grain%\' THEN Ingredients.quantity / 10\n' +
            '        WHEN Products.product_name LIKE \'h%\' THEN Ingredients.quantity * 10\n' +
            '        WHEN Products.product_name LIKE \'j%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'k%\' THEN Ingredients.quantity * 110\n' +
            '        WHEN Products.product_name LIKE \'l%\' THEN Ingredients.quantity * 17\n' +
            '        WHEN Products.product_name LIKE \'m%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'na%\' THEN Ingredients.quantity * 150\n' +
            '        WHEN Products.product_name LIKE \'no%\' THEN Ingredients.quantity * 5\n' +
            '        WHEN Products.product_name LIKE \'oeuf%\' THEN Ingredients.quantity * 50\n' +
            '        WHEN Products.product_name LIKE \'o%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'pain%\' THEN Ingredients.quantity * 50\n' +
            '        WHEN Products.product_name LIKE \'pate%\' THEN Ingredients.quantity * 2\n' +
            '        WHEN Products.product_name LIKE \'pers%\' THEN Ingredients.quantity / 2\n' +
            '        WHEN Products.product_name LIKE \'pilon%\' THEN Ingredients.quantity * 50\n' +
            '        WHEN Products.product_name LIKE \'pi%\' THEN Ingredients.quantity * 10\n' +
            '        WHEN Products.product_name LIKE \'poi%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'pot%\' THEN Ingredients.quantity * 2\n' +
            '        WHEN Products.product_name LIKE \'r%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'sac%\' THEN Ingredients.quantity * 7.5\n' +
            '        WHEN Products.product_name LIKE \'sau%\' THEN Ingredients.quantity * 300\n' +
            '        WHEN Products.product_name LIKE \'tom%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'tou%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'tr%\' THEN Ingredients.quantity * 10\n' +
            '        WHEN Products.product_name LIKE \'y%\' THEN Ingredients.quantity * 100\n' +
            '        WHEN Products.product_name LIKE \'z%\' THEN Ingredients.quantity * 10\n' +
            '        ELSE Ingredients.quantity\n' +
            '    END) / Articles.quantity) * Articles.price) AS TotalPrice\n' +
            'FROM Meals\n' +
            'INNER JOIN Recipes ON Recipes.recipe_id=Meals.recipe_id\n' +
            'INNER JOIN Ingredients ON Ingredients.recipe_id=Recipes.recipe_id\n' +
            'INNER JOIN Products ON Products.product_id=Ingredients.product_id\n' +
            'INNER JOIN Articles ON Articles.product_id=Products.product_id \n' +
            '\tAND Articles.price IN (' + research + ')\n' +
            'INNER JOIN Markets ON Markets.market_id=Articles.market_id\n' +
            'INNER JOIN QuantityTypes AS QuantityTypesIngredients ON QuantityTypesIngredients.quantitytype_id=Ingredients.quantitytype_id\n' +
            'INNER JOIN QuantityTypes ON QuantityTypes.quantitytype_id=Articles.quantitytype_id\n' +
            'WHERE Meals.date BETWEEN \'' + shoppinglist_start_date + '\' AND \'' + shoppinglist_end_date + '\' AND Meals.user_id = ' + user_id + '\n' +
            'GROUP BY Articles.article_id\n' +
            'ORDER BY Products.product_name')
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    }
}

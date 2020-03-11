const ShoppingLists = require('../models').ShoppingLists
const Items = require('../models').Items
const Article = require('../models').Articles
const Product = require('../models').Products
const Brand = require('../models').Brands
const Market = require('../models').Markets

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
    }
}

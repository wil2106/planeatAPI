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
    },
    async addNewShoppingList(req, res) {
        const { user_id, shoppinglist_name, shoppinglist_start_date,
            shoppinglist_end_date, articles } = req.body

        return ShoppingLists.create({
            shoppinglist_name: shoppinglist_name,
            user_id: user_id,
            shoppinglist_start_date: shoppinglist_start_date,
            shoppinglist_end_date: shoppinglist_end_date
        }).then((result) => {
            articles.forEach((item) => {
                Items.create({
                    article_id: item.article_id,
                    shoppinglist_id: result.shoppinglist_id,
                    quantity: item.quantity
                })
            })
            return res.status(200).json(result)
        })
        .catch(error => res.status(400).json(error.message))
    },
    async updateShoppingList(req, res) {
        const { shoppinglist_id, shoppinglist_name, shoppinglist_start_date,
            shoppinglist_end_date, articles } = req.body
        return ShoppingLists
        .update({
            shoppinglist_name: shoppinglist_name,
            shoppinglist_start_date: shoppinglist_start_date,
            shoppinglist_end_date: shoppinglist_end_date },
            { where: {
                shoppinglist_id: shoppinglist_id }
        })
        .then(success => {
            articles.forEach((item) => {
                switch(item.action) {
                    case "insert":
                        Items.create({
                            article_id: item.article_id,
                            shoppinglist_id: shoppinglist_id,
                            quantity: item.quantity
                        })
                        break;
                    case "update":
                        Items
                        .update({ quantity: item.quantity },
                            { where: {
                                article_id: item.article_id,
                                shoppinglist_id: shoppinglist_id }
                        })
                        break;
                    case "delete":
                        Items.destroy({
                            where: {
                                article_id: item.article_id,
                                shoppinglist_id: shoppinglist_id,
                            }
                        })
                        break;
                }
            })
            return res.status(200).json({message: "Shopping List "+shoppinglist_id+" successfully updated"})
        })
        .catch(error => res.status(400).json(error.message))
    },
    async deleteShoppingList(req, res) {
        const { shoppinglist_id } = req.body
        return ShoppingLists.destroy({
            where: {
                shoppinglist_id: shoppinglist_id
            }
        })
        .then(res.status(200).send({
            message: "Shopping List "+shoppinglist_id+" successfully deleted"
        }))
        .catch(error => res.status(400).json(error.message))
    }
}

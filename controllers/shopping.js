
const ShoppingLists = require('../models').ShoppingLists;
const Items = require('../models').Items;
const Article = require('../models').Articles;
const Product = require('../models').Products;
const Brand = require('../models').Brands;
const Market = require('../models').Markets;
const Meal = require('../models').Meals;
const Recipe = require('../models').Recipes;
const Ingredient = require('../models').Ingredients;
const QuantityType = require('../models').QuantityTypes;

const Sequelize = require('sequelize');
const op = Sequelize.Op;

ShoppingLists.hasMany(Items, {foreignKey: 'shoppinglist_id', as: 'articles'});
Article.hasMany(Items, {foreignKey: 'article_id', as: 'article_details'});
Brand.hasMany(Article, {foreignKey: 'brand_id', as: 'brand'});
Market.hasMany(Article, {foreignKey: 'market_id', as: 'market'});
Recipe.hasMany(Meal, {foreignKey: 'recipe_id', as: 'recipe'});
Recipe.hasMany(Ingredient, {foreignKey: 'shoppinglist_id', as: 'shoppingList'});
Product.hasMany(Ingredient, {foreignKey: 'ingredient_id', as: 'ingredient'});
Article.hasMany(Product, {foreignKey: 'product_id', as: 'product'});
QuantityType.hasMany(Ingredient, {foreignKey: 'quantitytype_id', as: 'quantityType'});

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
        const {user_id, shoppinglist_start_date, shoppinglist_end_date, lowest_price, shop} = req.body
        let filterData = {id: {$ne: null}};
        if (lowest_price === false && shop !== '') {
            filterData = {market_name: {$like: '%' + shop + '%'}
            };
        }
        return Meal
            .findAll({
                where: {date: {
                        [op.between]: [shoppinglist_start_date, shoppinglist_end_date]
                    },
                    user_id: user_id
                },
                include: [{
                    model: Recipe, as: 'recipe',
                    include: [{
                        model: Ingredient, as: 'ingredient',
                        attributes: ["quantity"],
                        include: [{
                            model: Product, as: 'product',
                            include: [{
                                model: Article, as: 'article',
                                attributes: ['product_id', 'price', [Sequelize.fn('min','quantity')]],
                                where: {quantity: {[op.gte]: Sequelize.col('ingredient.quantity')}},
                                group: ['price', 'product_id'],
                                include:[{
                                    model: Market, as: 'market',
                                    attributes: ['market_name'],
                                    where: filterData
                                },{
                                    model: QuantityType, as: 'quantityType',
                                    attributes: ['quantitytype_name']
                                }]
                            }]
                        }]
                    }]
                }]
            })
    }
};

const Recipes = require('../models').Recipes;
const Ingredients = require('../models').Ingredients
const Steps = require('../models').Steps
const QuantityType = require('../models').QuantityTypes
const Product = require('../models').Products
const Rating = require('../models').Ratings


const Sequelize = require('sequelize')

Recipes.hasMany(Ingredients, {
    foreignKey: 'recipe_id',
    as: 'ingredients'
})
Recipes.hasMany(Steps, {
    foreignKey: 'recipe_id',
    as: 'steps'
})
Ingredients.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
})
Ingredients.belongsTo(QuantityType, {
    foreignKey: 'quantitytype_id',
    as: 'quantity_type'
})

var op = Sequelize.Op

module.exports = {
    async getAllRecipes(req, res) {
        return Recipes
            .findAll({
                raw: true
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    },
    async getRecipeByKeyword(req, res) {
        const {
            keyword
        } = req.query
        return Recipes
            .findAll({
                attributes: ['recipe_name', 'recipe_nb_servings',
                    'recipe_prep_time', 'recipe_description'
                ],
                where: {
                    [op.or]: [{
                            recipe_name: {
                                [op.like]: '%' + keyword + '%'
                            }
                        },
                        {
                            recipe_description: {
                                [op.like]: '%' + keyword + '%'
                            }
                        }
                    ]
                }
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    },
    async getRecipeByID(req, res) {
        const {
            recipe_id
        } = req.params
        return Recipes
            .findAll({
                where: {
                    recipe_id: recipe_id
                }
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    },
    async getRecipeDetails(req, res) {
        const {
            recipe_id
        } = req.params
        return Recipes
            .findAll({
                attributes: ['recipe_name', 'recipe_nb_servings',
                    'recipe_prep_time', 'recipe_description'
                ],
                where: {
                    recipe_id: recipe_id
                },
                include: [{
                        model: Ingredients,
                        as: 'ingredients',
                        attributes: ['quantity'],
                        include: [{
                            model: QuantityType,
                            as: 'quantity_type',
                            attributes: [
                                ['quantitytype_name', 'name']
                            ]
                        }, {
                            model: Product,
                            as: 'product',
                            attributes: [
                                ['product_name', 'name']
                            ]
                        }]
                    },
                    {
                        model: Steps,
                        as: 'steps',
                        attributes: ['step_order_number', 'step_description']
                    }
                ]
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    },
    async rateRecipe(req, res) {
        const {
            recipe_id
        } = req.params
        const {
            user_id,
            rate
        } = req.body
        return Rating
            .create({
                recipe_id: recipe_id,
                user_id: user_id,
                rate: rate
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    },
    async getRating(req, res) {
        const {
            recipe_id
        } = req.params
        const {
            user_id
        } = req.query
        return Rating.findAll({
                attributes: ['recipe_id', 'rate'],
                where: {
                    recipe_id: recipe_id,
                    user_id: user_id
                }
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    }
}
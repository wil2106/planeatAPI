const Recipe = require('../models').Recipes;
const Ingredients = require('../models').Recipe_Contains_Product
const Steps = require('../models').Steps
const Product = require('../models').Products

const Sequelize = require('sequelize')

Recipe.hasMany(Ingredients, {foreignKey: 'recipe_id', as: 'ingredients'})
Recipe.hasMany(Steps, {foreignKey: 'recipe_id', as: 'steps'})//ok
Ingredients.belongsTo(Product, {foreignKey: 'product_id', as: 'product'})

var op = Sequelize.Op

module.exports = {
    async getAllRecipes(req, res) {
        return Recipe
        .findAll({raw: true})
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(400).json(error.message))
    },
    async getRecipeByKeyword(req, res){
        const {keyword} = req.params;
        return Recipe
        .findAll({ 
            attributes: ['recipe_name', 'recipe_nb_servings',
            'recipe_prep_time', 'recipe_description'],
            where: {
                [op.or]: [{
                    recipe_name: {
                        [op.like] : '%'+keyword+'%' 
                    }},
                    {recipe_description: {
                        [op.like] : '%'+keyword+'%' 
                    }}
                ]}
        })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(400).json(error.message))
    },
    async getRecipeByID(req, res) {
        const {recipe_id} = req.params;
        return Recipe
        .findAll({
            where: { recipe_id:recipe_id }
        })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(400).json(error.message))
    },
    async getRecipeDetails(req, res) {
        const {recipe_id} = req.params;
        return Recipe
        .findAll({
            attributes: ['recipe_name', 'recipe_nb_servings',
            'recipe_prep_time', 'recipe_description'],
            where: { recipe_id:recipe_id }, 
            include: [{
                model:Ingredients, as: 'ingredients',
                attributes: ['quantity', 'quantitytype_name'],
                include: [{
                    model:Product, as: 'product',
                    attributes: ['product_name']
            }]},
                {model:Steps, as: 'steps', 
                attributes: ['step_order_number', 'step_description']}]
        })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(400).json(error.message))
    }
}
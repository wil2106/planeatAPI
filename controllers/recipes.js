const Recipe = require('../models').Recipes;
const Ingredients = require('../models').Recipe_Contains_Product
const Steps = require('../models').Steps
const Product = require('../models').Products

const Sequelize = require('sequelize')

Ingredients.hasOne(Product, {foreignKey: 'product_id', as: 'product'})
//Product.hasMany(Ingredients, {foreignKey: 'product_id', as: 'details'})
Recipe.hasMany(Ingredients, {foreignKey: 'recipe_id', as: 'ingredients'})
Recipe.hasMany(Steps, {foreignKey: 'recipe_id', as: 'steps'})//ok

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

        /*var p = Product.findAll({attributes: ['product_name'],
        include: { model:Ingredients, as: 'details', 
            attributes: ['quantity', 'quantitytype_name'],
            where: {recipe_id:recipe_id}}})
        */
       
        /*return Recipe
        .findAll({
            attributes: ['recipe_name','recipe_nb_servings','recipe_prep_time',
            'recipe_description'],
            include: {
                model: Product, as: 'products', 
                attributes: ['product_name'],
                include: { 
                    model:Ingredients, as: 'details', 
                    attributes: ['quantity', 'quantitytype_name'],
                    where: {recipe_id:recipe_id}
                }
            }
        })*/
        return Recipe
        .findAll({
            attributes: ['recipe_name', 'recipe_nb_servings',
            'recipe_prep_time', 'recipe_description'],
            where: { recipe_id:recipe_id }, // due to that condition
            include: [{
                model:Ingredients, as: 'ingredients', 
                attributes: ['product_id', 'quantity', 'quantitytype_name'],
                include: [{
                    model:Product, as: 'product'
                    // issue not solved: ingredients.recipe_id = product.product_id
                    // must find a way to have: ingredients.product_id = product.product_id
            }]},
                {model:Steps, as: 'steps', 
                attributes: ['step_order_number', 'step_description']}]
        })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(400).json(error.message))
    }
}
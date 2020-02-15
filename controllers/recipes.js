const Recipe = require('../models').Recipes;

module.exports = {
    async getAllRecipes(req, res) {
        return Recipe
        .findAll({raw: true})
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(400).json(error.message))
    },
    async getRecipeByID(req, res) {
        const {recipe_id} = req.params;
        return Recipe
        .findAll({
            where: { recipe_id:recipe_id },
        })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(400).json(error.message))
    }
}
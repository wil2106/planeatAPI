const Planning = require('../models').User_Plans_Recipe;
const Recipe = require('../models').Recipes;

// Recipe.hasMany(Planning, {foreignKey: 'recipe_id', as: 'planning'})

module.exports = {
    async getPlannedRecipesByUser(req, res) {
        const { user_id } = req.params
        return Recipe
        .findAll({
            include: [{
                model:Planning, as: 'planning', 
                attributes: ['date', 'mealtype_name'],
                where: { user_id:user_id }
            }],
            attributes: ['recipe_id', 'recipe_name', 'recipe_nb_servings', 
            'recipe_prep_time']
        })
        .then(planning => res.status(200).json(planning))
        .catch(error => res.status(400).json(error.message))
    }
}
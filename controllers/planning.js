const Meal = require('../models').Meals;
const Recipe = require('../models').Recipes;

// Recipe.hasMany(Planning, {foreignKey: 'recipe_id', as: 'planning'})

module.exports = {
    async getAllPlannedMealsByUser(req, res) {
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
        .then(success => res.status(200).json(success))
        .catch(error => res.status(400).json(error.message))
    },
    async addNewPlannedMeal(req, res) {
        const { date, user_id, recipe_id, mealtype_id  } = req.body
        return Meal.create({
            date: date,
            user_id: user_id,
            recipe_id: recipe_id,
            mealtype_id: mealtype_id
        })
        .then(success => res.status(200).json(success))
        .catch(error => res.status(400).json(error.message))
    },
    async removePlannedMeal(req, res) {
        const { meal_id } = req.body

        return Meal.destroy({
            where: {
                meal_id: meal_id
            }
        })
        .then(success => res.status(200).json(success))
        .catch(error => res.status(400).json(error.message))
    }
}

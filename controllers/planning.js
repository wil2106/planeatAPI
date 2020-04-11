const Meals = require('../models').Meals
const Recipes = require('../models').Recipes
const MealType = require('../models').MealTypes

Recipes.hasMany(Meals, {
    foreignKey: 'recipe_id',
    as: 'planning'
})
Meals.belongsTo(MealType, {
    foreignKey: 'mealtype_id',
    as: 'meal_type'
})

module.exports = {
    async getAllPlannedMealsByUser(req, res) {
        const {
            user_id
        } = req.query
        console.log("Planning request: ", user_id)
        return Recipes
            .findAll({
                include: [{
                    model: Meals,
                    as: 'planning',
                    attributes: ['date', 'meal_id'],
                    where: {
                        user_id: user_id
                    },
                    include: [{
                        model: MealType,
                        as: 'meal_type',
                        attributes: [
                            ['mealtype_name', 'name']
                        ]
                    }]
                }],
                attributes: ['recipe_id', 'recipe_name', 'recipe_nb_servings',
                    'recipe_prep_time'
                ]
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    },
    async addNewPlannedMeal(req, res) {
        const {
            date,
            user_id,
            recipe_id,
            mealtype_id
        } = req.body
        return Meals.create({
                date: date,
                user_id: user_id,
                recipe_id: recipe_id,
                mealtype_id: mealtype_id
            })
            .then(success => res.status(200).json(success))
            .catch(error => res.status(400).json(error.message))
    },
    async removePlannedMeal(req, res) {
        const {
            meal_id
        } = req.query
        return Meals.destroy({
                where: {
                    meal_id: meal_id
                }
            })
            .then(res.status(200).send({
                message: "Meal " + meal_id + " successfully removed"
            }))
            .catch(error => res.status(400).json(error.message))
    }
}
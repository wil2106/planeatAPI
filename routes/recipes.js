const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/', controllers.recipe.getAllRecipes)
router.get('/search', controllers.recipe.getRecipeByKeyword)
router.get('/:recipe_id', controllers.recipe.getRecipeByID)
router.get('/:recipe_id/details', controllers.recipe.getRecipeDetails)
router.post('/:recipe_id/rate', controllers.recipe.rateRecipe)
router.get('/:recipe_id/rate', controllers.recipe.getRating)
router.get('/info', (req, res) => res.status(200).send({
    message: "Recipe info route"
}))

module.exports = router
const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/', controllers.recipe.getAllRecipes)
router.get('/:recipe_id', controllers.recipe.getRecipeByID)
router.get('/info', (req, res) => res.status(200).send({
    message: "Recipe info route"
}))

module.exports = router
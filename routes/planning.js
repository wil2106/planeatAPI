const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/meals', controllers.planning.getAllPlannedMealsByUser)
router.post('/addNewMeal', controllers.planning.addNewPlannedMeal)
router.delete('/removeMeal', controllers.planning.removePlannedMeal)
router.get('/info', (req, res) => res.status(200).send({
    message: "Planning info route"
}))

module.exports = router

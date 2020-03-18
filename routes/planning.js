const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/', controllers.planning.getAllPlannedMealsByUser)
router.post('/', controllers.planning.addNewPlannedMeal)
router.delete('/', controllers.planning.removePlannedMeal)
router.get('/info', (req, res) => res.status(200).send({
    message: "Planning info route"
}))

module.exports = router
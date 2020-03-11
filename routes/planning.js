const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/user=:user_id/recipes', controllers.planning.getPlannedRecipesByUser)
router.get('/info', (req, res) => res.status(200).send({
    message: "Planning info route"
}))

module.exports = router
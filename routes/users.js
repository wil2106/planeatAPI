const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/', controllers.profile.modifyProfile)
router.get('/profile', controllers.profile.getProfile)
router.get('/info', (req, res) => res.status(200).send({
    message: "Product info route"
}))

module.exports = router
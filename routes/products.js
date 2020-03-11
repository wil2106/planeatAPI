const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/', controllers.product.getAllProducts)
router.get('/:product_id', controllers.product.getProductByID)
router.get('/info', (req, res) => res.status(200).send({
    message: "Product info route"
}))

module.exports = router
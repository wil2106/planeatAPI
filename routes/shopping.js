const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
//Define routes
router.get('/', controllers.shopping.getAllShoppingLists)
router.get('/:shoppinglist_id/details', controllers.shopping.getShoppingListDetails)
router.get('/generate', controllers.shopping.generateShoppingList)
router.post('/', controllers.shopping.addNewShoppingList)
router.put('/', controllers.shopping.updateShoppingList)
router.delete('/', controllers.shopping.deleteShoppingList)
router.get('/info', (req, res) => res.status(200).send({
    message: "ShoppingList info route"
}))

module.exports = router
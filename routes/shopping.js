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
//router.post('/create', controllers.shopping.addNewShoppingList)
//router.put('/:shoppinglist_id/update', controllers.shopping.updateShoppingList)
//router.delete('/:shoppinglist_id/delete', controllers.shopping.deleteList)
router.get('/generate',controllers.shopping.generateShoppingList)
router.get('/info', (req, res) => res.status(200).send({
    message: "ShoppingList info route"
}))

module.exports = router

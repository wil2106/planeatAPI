const Product = require('../models').Products;

module.exports = {
    async getAllProducts(req, res) {
        return Product
        .findAll({raw: true})
        .then(success => res.status(200).json(success))
        .catch(error => res.status(400).json(error.message))
    },
    async getProductByID(req, res) {
        const { product_id } = req.params;
        return Product
        .findAll({
            where: { product_id: product_id },
        })
        .then(success => res.status(200).json(success))
        .catch(error => res.status(400).json(error.message))
    }
}

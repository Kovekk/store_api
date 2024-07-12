const express = require('express')
const router = express.Router()
const productController = require('../controllers/products.js')
const { productsValidation, validate } = require('../middleware/validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js')

//Get all products
router.get('/', isAuthenticated, productController.getAll)

//Get one product by id
router.get('/:id', isAuthenticated, productController.getSingle)

//Create product
router.post('/',  isAuthenticated, productsValidation, validate, productController.createProduct)

//Update one product
router.put('/:id', isAuthenticated, productsValidation, validate, productController.updateProduct)

//Delete one product
router.delete('/:id', isAuthenticated, productController.deleteProduct)

//Update product supplier
router.put('/:id/updateSupplier/:supplierId', isAuthenticated, productController.updateSupplier)

module.exports = router
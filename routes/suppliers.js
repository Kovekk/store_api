const express = require('express')
const router = express.Router()
const supplierController = require('../controllers/suppliers.js')
const { suppliersValidation, validate } = require('../middleware/validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js')

//Get all suppliers
router.get('/', isAuthenticated, supplierController.getAll)

//Get one supplier by id
router.get('/:id', isAuthenticated, supplierController.getSingle)

//Create supplier
router.post('/',  isAuthenticated, suppliersValidation, validate, supplierController.createSupplier)

//Update one supplier
router.put('/:id', isAuthenticated, suppliersValidation, validate, supplierController.updateSupplier)

//Delete one supplier
router.delete('/:id', isAuthenticated, supplierController.deleteSupplier)

module.exports = router
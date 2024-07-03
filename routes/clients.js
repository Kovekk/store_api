const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clients')
const { clientsValidation, validate } = require('../middleware/validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js')


// Get all clients
router.get('/', clientController.getAll)

// Get only one client
router.get('/:id', clientController.getSingle)

// Add new clients
router.post('/', clientsValidation, validate, clientController.createClient)

// Update one client
router.put('/:id', clientsValidation, validate, clientController.updateClient)

// Delete one client
router.delete('/:id', clientController.deleteClient)

module.exports = router
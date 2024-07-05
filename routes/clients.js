const express = require('express')
const router = express.Router()
const clientController = require('../controllers/clients')
const { clientsValidation, validate } = require('../middleware/validation.js')
const { isAuthenticated } = require('../middleware/authenticate.js')


// Get all clients
router.get('/', isAuthenticated, clientController.getAll)

// Get only one client
router.get('/:id', isAuthenticated, clientController.getSingle)

// Add new clients
router.post('/', isAuthenticated, clientsValidation, validate, clientController.createClient)

// Update one client
router.put('/:id', isAuthenticated, clientsValidation, validate, clientController.updateClient)

// Delete one client
router.delete('/:id', isAuthenticated, clientController.deleteClient)

module.exports = router
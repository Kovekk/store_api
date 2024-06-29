const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// home route (current does nothing)
router.get('/', (req, res) => {res.send('Hello World')});

// swagger route
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); 

module.exports = router;
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Store API',
    description: 'Create, update, get, and delete store data through this API.'
  },
  host: 'https://store-api-6sgx.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// NOTE: If you are using the express Router, you must pass in the 'endpointsFiles' only the
// root file where the route starts, such as index.js, app.js, routes.js, etc...

swaggerAutogen(outputFile, endpointsFiles, doc);

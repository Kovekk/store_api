const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Store API',
    description: 'Create, update, get, and delete store data through this API.'
  },
  host: 'store-api-ovl4.onrender.com',
  schemes: ['https, http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// NOTE: If you are using the express Router, you must pass in the 'endpointsFiles' only the
// root file where the route starts, such as index.js, app.js, routes.js, etc...

swaggerAutogen(outputFile, endpointsFiles, doc);

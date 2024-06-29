const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./utilities/database')

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    // Sending routes through the routes folder
    .use('/', require('./routes'));

// Connecting to mongodb and starting server
// WON'T RUN UNTIL MONGODBURI VARIABLE IS SET IN THE .ENV FILE
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`)});
    }
});
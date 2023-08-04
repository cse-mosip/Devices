// environmental variables
require('dotenv').config();
const utils = require('./helpers/util');

const port = process.env.PORT || 5000;

//swagger API testing
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//swagger
const swaggerDocs = require('./docs/apidocs.js');

const docs = swaggerJsDoc(swaggerDocs);

//express app
const appMaker = require('./app');
const app = appMaker.makeApp();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
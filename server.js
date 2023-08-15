// environmental variables
require('dotenv').config();
const utils = require('./helpers/util');
const regController = require('./controllers/reg.controller');

const { Server } = require("socket.io");
const http = require('http');

const port = process.env.PORT || 7291;

//swagger API testing
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

//swagger
const swaggerDocs = require('./docs/apidocs.js');

const docs = swaggerJsDoc(swaggerDocs);

//express app
const appMaker = require('./app');
const app = appMaker.makeApp();

const server = http.createServer(app);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('fingerprint', async (deviceSubId) => {

        const data = await regController.capture(deviceSubId);

        io.emit('fingerprintData', data);
    });
});

server.listen(port, () => {
    console.log(`Running on port ${port}`);
});
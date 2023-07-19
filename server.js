// environmental variables
require('dotenv').config();

//express app
const appMaker = require('./app');
const app = appMaker.makeApp();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
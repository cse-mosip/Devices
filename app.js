const express = require('express');
const cors = require('cors');

// environmental variables
require('dotenv').config();

const dataRoutes = require('./routes/data.route');
const authRoutes = require('./routes/auth.route');
const regRoutes = require('./routes/reg.route');

const makeApp = () => {
    // express app
    const app = express();

    app.use(
        cors({
            exposedHeaders: ["x-refresh-token", "x-access-token"],
        })
    );
    app.use(express.json());

    // middleware & static files
    app.use(express.urlencoded({ extended: true }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    // set static file path for productioin build
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
    }

    app.use((req, res, next) => {
        res.locals.path = req.path;
        next();
    });

    //routes
    app.use('/', dataRoutes);
    app.use('/auth', authRoutes);
    app.use('/reg', regRoutes);

    return app;
}

module.exports = {
    makeApp
}
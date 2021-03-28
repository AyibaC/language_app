const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require('morgan');
//const bodyParser = require('body-parser')
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

module.exports = function (app) {
    // In dev mode, react-server serves the files BUT in production we BUILD the react project and express serves it out of the build folder
    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/", "build")));
        app.use(compression());
    }

    // Add Access Control Allow Origin headers
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        next();
        });

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));

    // parse application/json
    app.use(express.json());

    // Helmet for security
    app.use(helmet());
    // CORS to make our API public
    app.use(cors());
    //morgan for creating logs of http requests
    app.use(morgan('dev'));
    //auth0
    const jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: 'https://dev-1qrl1afc.eu.auth0.com/.well-known/jwks.json'
        }),
        audience: 'http://localhost:8000/api/v1',
        issuer: 'https://dev-1qrl1afc.eu.auth0.com/',
        algorithms: ['RS256']
    });

    app.use(jwtCheck);

    app.get('/authorized', function (req, res) {
        res.send('Secured Resource');
    });
    
};
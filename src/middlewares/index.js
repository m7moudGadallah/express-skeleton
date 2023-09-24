// Load dependencies
const morgan = require('morgan');
const { json, urlencoded, static } = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');
const { AppError, StandardJsonResponse } = require('../utils');

// Load middlewares
const preMiddlewaresLoader = require('./preMiddlewares');
const postMiddlewaresLoader = require('./postMiddlewares');

/**
 * Middleware loader for an Express.js application.
 *
 * This module exports a function that loads various middlewares for an Express.js application, including pre-middlewares and post-middlewares. Pre-middlewares are responsible for setting up request handling before routing, and post-middlewares handle tasks after routing. These middlewares enhance the security, functionality, and logging capabilities of the application.
 *
 * @module middlewares/index
 *
 * @param {Object} app - The Express.js application instance to which the middlewares will be applied.
 * @returns {Object} - An object with functions for loading pre-middlewares and post-middlewares.
 *
 * @function loadMiddlewares
 *
 * @param {Object} app - The Express.js application instance to which the middlewares will be applied.
 *
 * @example
 * // Import the middleware loader module
 * const loadMiddlewares = require('./middlewares/index');
 *
 * // Create an Express.js application
 * const app = express();
 *
 * // Load pre-middlewares and post-middlewares
 * const middlewareLoader = loadMiddlewares(app);
 * middlewareLoader.pre();  // Load pre-middlewares
 * middlewareLoader.post(); // Load post-middlewares
 */
module.exports = (app) => ({
    // Load pre-middlewares
    pre() {
        preMiddlewaresLoader(app, {
            morgan,
            json,
            urlencoded,
            static,
            cookieParser,
            helmet,
            rateLimit,
            xss,
            hpp,
            cors,
            path,
        });
    },

    // Load post-middlewares
    post() {
        postMiddlewaresLoader(app);
    },
});

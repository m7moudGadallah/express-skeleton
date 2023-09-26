// Load dependencies
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');

// Load middlewares
const preMiddlewaresLoader = require('./preMiddlewares');
const postMiddlewaresLoader = require('./postMiddlewares');
const customMiddlewares = require('./customMiddlewares');

/**
 * Exposes custom middlewares, pre-middlewares, and post-middlewares for an Express.js application.
 *
 * @param {object} app - The Express.js application instance.
 * @returns {object} An object containing middleware functions.
 */
module.exports = {
  /**
   * Custom middlewares for the application.
   * @type {object}
   */
  customMiddlewares,

  /**
   * Middleware loader function.
   *
   * @param {object} app - The Express.js application instance.
   * @returns {object} An object with methods to load pre-middlewares and post-middlewares.
   */
  middlewaresLoader(app) {
    return {
      /**
       * Load pre-middlewares before routes.
       */
      pre() {
        preMiddlewaresLoader(app, {
          morgan,
          express,
          cookieParser,
          helmet,
          rateLimit,
          xss,
          hpp,
          cors,
          path,
        });
      },

      /**
       * Load post-middlewares after routes.
       */
      post() {
        postMiddlewaresLoader(app);
      },
    };
  },
};

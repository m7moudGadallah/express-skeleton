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

/**
 * Middleware loader function.
 *
 * @param {object} app - The Express.js application instance.
 * @returns {object} An object with methods to load pre-middlewares and post-middlewares.
 */
exports.middlewaresLoader = (app) => ({
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
});

// Load Error Handlers
const errorHandlers = require('./errorHandlers');

/**
 * Post-middlewares for an Express.js application.
 *
 * @module middlewares/postMiddlewares
 *
 * @param {Object} app - The Express.js application instance to which the post-middlewares will be applied.
 *
 * @function applyPostMiddlewares
 *
 * @param {Object} app - The Express.js application instance.
 */
module.exports = (app) => {
  // error handling for undefined routes
  app.all('*', errorHandlers.undefinedRouteHandler);

  // global error handling
  app.use(errorHandlers.globalErrorHandler);
};

const { AppError, JsonResponse } = require('../../utils');

// Loader Error Handlers
const undefinedRouteHandlerLoader = require('./undefinedRoutesHandler');
const globalErrorHandlerLoader = require('./globalErrorHandler');

/**
 * Error handling middlewares for an Express.js application.
 *
 * This module exports error handling middlewares that can be used with an Express.js application.
 * It includes two main error handlers: `undefinedRouteHandler` for handling undefined routes
 * and `globalErrorHandler` for handling global application errors.
 *
 * @module middlewares/errorHandlers/index
 * @property {Function} undefinedRouteHandler - Middleware for handling undefined routes.
 * @property {Function} globalErrorHandler - Middleware for handling global application errors.
 */
module.exports = {
  undefinedRouteHandler: undefinedRouteHandlerLoader({ AppError }),
  globalErrorHandler: globalErrorHandlerLoader({ JsonResponse }),
};

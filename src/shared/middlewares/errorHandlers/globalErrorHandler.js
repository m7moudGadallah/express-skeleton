// Load all Error Handler
const databaseErrorHandler = require('./databaseErrorHandler');

/**
 * Global error handling middleware for Express.js.
 *
 * This module exports a global error handling middleware for Express.js applications. It can be used to handle and respond to errors that occur during request processing. Depending on the environment (development or production) and the chosen ORM (Object-Relational Mapping) library (Mongoose or Prisma), it customizes and formats error responses for consistency and security.
 *
 * @module globalErrorHandler
 *
 * @param {Object} dependencies - An object containing dependencies, typically including a `JsonResponse` class for constructing standardized JSON responses.
 * @param {Function} dependencies.JsonResponse - A constructor function for creating standardized JSON response instances.
 * @returns {Function} - A global error handling middleware function for Express.js.
 *
 * @function globalErrorHandeler
 *
 * @param {Error} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 *
 * @throws {Error} Throws an error if any of the required dependencies are missing.
 */
module.exports = (dependencies) => {
  const { JsonResponse } = dependencies;

  /**
   * Sends error response in development environment.
   * @function sendErrorDev
   * @param {Error} err - The error object.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  const sendErrorDev = (err, req, res) => {
    console.log(err.message.brightRed);

    return new JsonResponse(res, err.statusCode)
      .setMainContent(false, 'something went wrong')
      .setFailedPayload({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      })
      .send();
  };

  /**
   * Sends error response in production environment.
   * @function sendErrorProd
   * @param {Error} err - The error object.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
      return new JsonResponse(res, err.statusCode)
        .setMainContent(false, 'something went wrong')
        .setFailedPayload({
          status: err.status,
          message: err.message,
        })
        .send();
    }

    console.error('ERROR 💥', err);

    return new JsonResponse(res, 500)
      .setMainContent(false, 'something went wrong')
      .setFailedPayload({
        status: 'error',
        message: 'Something went very wrong!',
      })
      .send();
  };

  /**
   * Global error handler middleware.
   * @function globalErrorHandeler
   * @param {Error} err - The error object.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {function} next - The next middleware function.
   */
  const globalErrorHandeler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    if (process.env.NODE_ENV === 'production') {
      let error = { ...err, message: err.message };

      error = databaseErrorHandler(error);

      return sendErrorProd(error, req, res);
    }

    return sendErrorDev(err, req, res);
  };

  return globalErrorHandeler;
};

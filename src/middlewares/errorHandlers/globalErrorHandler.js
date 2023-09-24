// Load all Error Customizers
const databaseErrorCustomizer = require('./databaseErrorCustomizer');

// Load environment variables
const { NODE_ENV: MODE } = process.env;

/**
 * Global error handling middleware for Express.js.
 *
 * This module exports a global error handling middleware for Express.js applications. It can be used to handle and respond to errors that occur during request processing. Depending on the environment (development or production) and the chosen ORM (Object-Relational Mapping) library (Mongoose or Prisma), it customizes and formats error responses for consistency and security.
 *
 * @module globalErrorHandler
 *
 * @param {Object} dependencies - An object containing dependencies, typically including a `StandardJsonResponse` class for constructing standardized JSON responses.
 * @param {Function} dependencies.StandardJsonResponse - A constructor function for creating standardized JSON response instances.
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
    const { StandardJsonResponse } = dependencies;

    /**
     * Sends error response in development environment.
     * @function sendErrorDev
     * @param {Error} err - The error object.
     * @param {object} req - The request object.
     * @param {object} res - The response object.
     */
    const sendErrorDev = (err, req, res) => {
        console.log(err.message.brightRed);

        return new StandardJsonResponse(res, err.statusCode)
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
            return new StandardJsonResponse(res, err.statusCode)
                .setMainContent(false, 'something went wrong')
                .setFailedPayload({
                    status: err.status,
                    message: err.message,
                })
                .send();
        }

        console.error('ERROR 💥', err);

        return new StandardJsonResponse(res, 500)
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

        if (MODE === 'production') {
            let error = { ...err };

            error = databaseErrorCustomizer(error);

            return sendErrorProd(error, req, res);
        }

        return sendErrorDev(err, req, res);
    };

    return globalErrorHandeler;
};

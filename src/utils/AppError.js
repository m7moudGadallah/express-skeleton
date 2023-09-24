/**
 * Represents an application-specific error.
 * @class AppError
 * @extends Error
 * @param {object} options - The options for the error.
 * @param {string} [options.message=''] - The error message.
 * @param {number} [options.statusCode=''] - The HTTP status code for the error.
 * @property {number} statusCode - The HTTP status code for the error.
 * @property {boolean} isOperational - Indicates whether the error is operational (i.e., caused by a problem with the application code) rather than a system error.
 * @property {string} status - The status string based on the statusCode. It is 'fail' if the statusCode starts with '4', otherwise 'error'.
 * @example
    const error = new AppError({ message: 'An error occurred.', statusCode: 500 });
*/
class AppError extends Error {
    constructor(message = '', statusCode = '') {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
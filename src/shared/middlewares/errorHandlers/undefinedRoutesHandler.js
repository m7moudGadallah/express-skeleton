/**
 * Middleware to handle undefined routes by generating a 404 error.
 *
 * @param {Object} dependencies - An object containing required middleware dependencies.
 * @param {Class} dependencies.AppError - The AppError class from '../../utils/AppError.js' for creating application-specific errors.
 *
 * @throws {AppError} Throws a 404 AppError when the requested route is not found.
 *
 * @returns {function} The middleware function for handling undefined routes.
 */
module.exports = (dependencies) => {
  const { AppError } = dependencies;

  /**
   * Middleware to handle undefined routes by generating a 404 error.
   * @function
   * @name undefinedRoutesHandler
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @param {function} next - The next middleware function.
   */
  const undefinedRoutesHandler = (req, res, next) =>
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));

  return undefinedRoutesHandler;
};

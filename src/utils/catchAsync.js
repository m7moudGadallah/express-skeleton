/**
 * A middleware that catches any errors thrown by an async function and passes them to the next middleware.
 *
 * @param {Function} fn The async function to wrap.
 * @returns {Function} A middleware function that catches errors.
 */
module.exports = function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};

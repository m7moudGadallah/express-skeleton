const catchAsync = require('./catchAsync');
const JsonResponse = require('./jsonResponse');
const AppError = require('./appError');
const APIFeatures = require('./apiFeatures');

/**
 * A utility function for catching and handling asynchronous errors in Express route handlers.
 * @type {Function}
 */
exports.catchAsync = catchAsync;

/**
 * A class for creating standard JSON responses in Express route handlers.
 * @type {Class}
 */
exports.JsonResponse = JsonResponse;

/**
 * A class for representing custom application errors in Express route handlers.
 * @type {Class}
 */
exports.AppError = AppError;

/**
 * A class for handling advanced filtering, sorting, and pagination of API queries in Express route handlers.
 * @type {Class}
 */
exports.APIFeatures = APIFeatures;

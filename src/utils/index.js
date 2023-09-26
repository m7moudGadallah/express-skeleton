const catchAsync = require('./catchAsync');
const JsonResponse = require('./JsonResponse');
const AppError = require('./AppError');
const APIFeatures = require('./APIFeatures');

/**
 * A module that exports utility functions and classes for handling errors and asynchronous operations.
 * @module
 */
module.exports = {
  /**
   * A utility function for catching and handling asynchronous errors in Express route handlers.
   * @type {Function}
   */
  catchAsync,

  /**
   * A class for creating standard JSON responses in Express route handlers.
   * @type {Class}
   */
  JsonResponse,

  /**
   * A class for representing custom application errors in Express route handlers.
   * @type {Class}
   */
  AppError,

  /**
   * A class for handling advanced filtering, sorting, and pagination of API queries in Express route handlers.
   * @type {Class}
   */
  APIFeatures,
};

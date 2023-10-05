const express = require('express');
const errorHandlers = require('../errorHandlers');
const postMiddlewares = require('../postMiddlewares');

// Create a mock Express app
const app = express();

// Mock the errorHandlers.undefinedRouteHandler and errorHandlers.globalErrorHandler functions
jest.mock('../errorHandlers', () => ({
  undefinedRouteHandler: jest.fn(),
  globalErrorHandler: jest.fn(),
}));

/**
 * Tests for postMiddlewares.
 *
 * Verify that the postMiddlewares function applies all post-middlewares.
 */
describe('postMiddlewares', () => {
  beforeEach(() => {
    // Clear mock function call history before each test
    errorHandlers.undefinedRouteHandler.mockClear();
    errorHandlers.globalErrorHandler.mockClear();

    // Mock app.use, app.all
    app.use = jest.fn();
    app.all = jest.fn();
  });

  it('should mount the global error handler', () => {
    // Call the function to apply post-middlewares
    postMiddlewares(app);

    // verify that the global error handler has bee mounted
    expect(app.use).toHaveBeenCalledWith(errorHandlers.globalErrorHandler);
  });

  it('should mount the undefined route handler', () => {
    // Call the function to apply post-middlewares
    postMiddlewares(app);

    // verify that the undefined route handler has bee mounted
    expect(app.all).toHaveBeenCalledWith(
      '*',
      errorHandlers.undefinedRouteHandler
    );
  });
});

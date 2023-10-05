const catchAsync = require('../catchAsync');

/**
 * Tests for catchAsync.
 *
 * Verify that catchAsync returns a middleware function.
 * Verify that catchAsync catches and passes errors to the next middleware.
 */
describe('catchAsync', () => {
  // Verify that catchAsync returns a middleware function.
  it('should return a middleware function', () => {
    /**
     * Create a middleware function using catchAsync.
     * Verify that the middleware function is a function.
     */

    // Create a middleware function using catchAsync.
    const middleware = catchAsync(() => {});

    // Verify that the middleware function is a function.
    expect(typeof middleware).toBe('function');
  });

  // Verify that catchAsync catches and passes errors to the next middleware.
  it('should catch and pass errors to the next middleware', async () => {
    /**
     * Create an error.
     * Create an async function that throws the error.
     * Create mock request, response, and next objects.
     * Create a middleware function using catchAsync.
     * Call the middleware function.
     * Verify that the next middleware was called with the error.
     */

    // Create an error.
    const error = new Error('something went wrong');

    // Create an async function that throws the error.
    const fn = async () => {
      throw error;
    };

    // Create mock request, response, and next objects.
    const req = {};
    const res = {};
    const next = jest.fn();

    // Create a middleware function using catchAsync.
    const middleware = catchAsync(fn);

    // Call the middleware function.
    await middleware(req, res, next);

    // Verify that the next middleware was called with the error.
    expect(next).toHaveBeenCalledWith(error);
  });
});

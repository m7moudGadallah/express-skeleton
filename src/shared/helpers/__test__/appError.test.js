const AppError = require('../appError');

/**
 * Tests for AppError.
 *
 * Verify that AppError construct a new instance of the class.
 * Verify that the instance has the correct properties.
 * Verify that the instance has the correct status.
 * Verify that the instance has the correct stack trace.
 */
describe('AppError class', () => {
  // Verify that AppError construct a new instance of the class.
  it('should construct a new instance of the AppError class', () => {
    /**
     * Create a new instance of the AppError class.
     * Verify that the instance is an instance of the AppError class.
     */

    // Create a new instance of the AppError class.
    const error = new AppError('Something went wrong.', 500);

    // Verify that the instance is an instance of the AppError class.
    expect(error).toBeInstanceOf(AppError);
  });

  // Verify that the instance has the correct properties.
  it('should have the correct properties', () => {
    /**
     * Create a new instance of the AppError class.
     * Verify that the instance has the correct properties.
     */

    // Create a new instance of the AppError class.
    const error = new AppError('Something went wrong.', 500);

    // Verify that the instance has the correct properties.
    expect(error.message).toMatch('Something went wrong.');
    expect(error.statusCode).toBe(500);
    expect(error.status).toBe('error');
    expect(error.isOperational).toBeTruthy();
  });

  // Verify that the instance has the correct status.
  it('should set status to "fail" if statusCode starts with 4', () => {
    /**
     * Create a new instance of the AppError class.
     * Verify that instance has been defined.
     * Verify that the instance has the correct status.
     */

    // Create a new instance of the AppError class.
    const error = new AppError('Something went wrong.', 400);

    // Verify that instance has been defined.
    expect(error).toBeDefined();

    // Verify that the instance has the correct status.
    expect(error.status).toBe('fail');
  });

  // Verify that the instance has the correct stack trace.
  it('should capture the stack trace', () => {
    /**
     * Create a new instance of the AppError class.
     * Verify that instance has been defined.
     * Verify that the instance has the correct stack trace.
     */

    // Create a new instance of the AppError class.
    const error = new AppError('Something went wrong.', 400);

    // Verify that instance has been defined.
    expect(error).toBeDefined();

    // Verify that the instance has the correct stack trace.
    expect(error.stack).toBeDefined();
  });
});

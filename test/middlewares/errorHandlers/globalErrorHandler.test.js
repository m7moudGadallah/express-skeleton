require('colors');
const globalErrorHandeler = require('../../../src/middlewares/errorHandlers/globalErrorHandler');
const { JsonResponse } = require('../../../src/utils');

// Mock express request, response and next
const mockRequest = {};
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const mockNext = jest.fn();

describe('globalErrorHandeler', () => {
  // Save original environment
  const originalEnv = process.env.NODE_ENV;

  // Clear mocks before each test
  beforeEach(() => {
    mockResponse.status.mockClear();
    mockResponse.json.mockClear();
    mockNext.mockClear();
    process.env = { ...originalEnv };
  });

  // Restore original environment
  afterAll(() => {
    process.env = originalEnv;
  });

  // Test for development environment
  it('should send error response in development environment', () => {
    process.env.NODE_ENV = 'development';

    // Create error object
    const error = new Error('Test error');
    error.statusCode = 400;

    // Pass error to middleware
    const middleware = globalErrorHandeler({ JsonResponse });
    middleware(error, mockRequest, mockResponse, mockNext);

    // Assert that response status setted to error status code
    expect(mockResponse.status).toHaveBeenCalledWith(error.statusCode);

    // Assert that json response sent
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'something went wrong',
      payload: {
        status: 'Error',
        error,
        message: error.message,
        stack: error.stack,
      },
    });
  });

  // Test that default send errors in development environment
  it('should default to development environment when NODE_ENV is not set', () => {
    process.env.NODE_ENV = undefined;

    // Create error object
    const error = new Error('Test error');
    error.statusCode = 400;

    // Pass error to middleware
    const middleware = globalErrorHandeler({ JsonResponse });
    middleware(error, mockRequest, mockResponse, mockNext);

    // Assert that response status setted to error status code
    expect(mockResponse.status).toHaveBeenCalledWith(error.statusCode);

    // Assert that json response sent
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'something went wrong',
      payload: {
        status: 'Error',
        error,
        message: error.message,
        stack: error.stack,
      },
    });
  });

  // Test for production environment
  it('should send error response in production environment for operational errors', () => {
    process.env.NODE_ENV = 'production';

    // Create error object
    const error = new Error('Test error');
    error.statusCode = 400;
    error.isOperational = true;

    // Pass error to middleware
    const middleware = globalErrorHandeler({ JsonResponse });
    middleware(error, mockRequest, mockResponse, mockNext);

    // Assert that response status setted to error status code
    expect(mockResponse.status).toHaveBeenCalledWith(error.statusCode);

    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'something went wrong',
      payload: {
        status: 'Error',
        message: error.message,
      },
    });
  });

  // Test generic errors in production environment
  it('should send generic error response in production environment for non-operational errors', () => {
    process.env.NODE_ENV = 'production';

    // Create error object
    const error = new Error('Internal server error');
    error.statusCode = 500;
    error.isOperational = false;

    // Pass error to middleware
    const middleware = globalErrorHandeler({ JsonResponse });
    middleware(error, mockRequest, mockResponse, mockNext);

    // Assert that response status setted to error status code
    expect(mockResponse.status).toHaveBeenCalledWith(500);

    // Assert that json response sent
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'something went wrong',
      payload: {
        status: 'error',
        message: 'Something went very wrong!',
      },
    });
  });
});

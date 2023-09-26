const express = require('express');
const preMiddlewares = require('../../src/middlewares/preMiddlewares');

describe('preMiddlewares', () => {
  const originalEnvVars = process.env;
  let app;
  let dependencies;

  beforeEach(() => {
    // Create a new Express app for each test case
    app = express();

    // Mock express.json, express.urlencoded and express.static to avoid errors
    express.json = jest.fn();
    express.urlencoded = jest.fn();
    express.static = jest.fn();

    // Mock path.join to avoid errors
    const path = {
      join: jest.fn(),
    };

    // Mock app.use to spy on middleware function calls
    app.use = jest.fn();

    // Mock the dependencies required by the middleware module
    dependencies = {
      morgan: jest.fn(),
      express,
      cookieParser: jest.fn(),
      helmet: jest.fn(),
      rateLimit: jest.fn(),
      xss: jest.fn(),
      hpp: jest.fn(),
      cors: jest.fn(),
      path,
    };

    process.env = { ...originalEnvVars };
  });

  afterEach(() => {
    // Reset process.env.NODE_ENV to 'test' after each test case
    process.env.NODE_ENV = 'test';

    // Clear all mock function calls after each test case
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore the original environment variables after all test cases
    process.env = originalEnvVars;
  });

  it('should apply morgan middleware in development mode only', () => {
    // Set the NODE_ENV to 'development'
    process.env.NODE_ENV = 'development';

    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.morgan).toHaveBeenCalledTimes(1);
  });

  it('should not apply morgan middleware in production mode', () => {
    // Set the NODE_ENV to 'production'
    process.env.NODE_ENV = 'production';

    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.morgan).not.toHaveBeenCalled();
  });

  it('should apply body parseing middlewares (json, urlencoded)', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(express.json).toHaveBeenCalledTimes(1);
    expect(express.urlencoded).toHaveBeenCalledTimes(1);
  });

  it('should apply cookie parser middleware', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.cookieParser).toHaveBeenCalledTimes(1);
  });

  it('should apply rate limit middleware', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.rateLimit).toHaveBeenCalledTimes(1);
  });

  it('should apply helmet middleware', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.helmet).toHaveBeenCalledTimes(1);
  });

  it('should apply xss middleware', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.xss).toHaveBeenCalledTimes(1);
  });

  it('should apply hpp middleware', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.hpp).toHaveBeenCalledTimes(1);
  });

  it('should apply cors middleware', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(dependencies.cors).toHaveBeenCalledTimes(1);
  });

  it('should apply static files middleware', () => {
    // Call the preMiddlewares function
    preMiddlewares(app, dependencies);

    expect(express.static).toHaveBeenCalledTimes(1);
  });
});

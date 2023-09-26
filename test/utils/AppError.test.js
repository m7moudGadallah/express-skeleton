const { AppError } = require('../../src/utils');

describe('AppError class', () => {
  it('should create an instance from AppError', () => {
    const error = new AppError('something went wrong', 500);

    expect(error).toBeInstanceOf(AppError);
  });

  it('should have the correct properties', () => {
    const error = new AppError('something went wrong', 500);

    expect(error.message).toMatch('something went wrong');
    expect(error.statusCode).toBe(500);
    expect(error.status).toBe('error');
    expect(error.isOperational).toBeTruthy();
  });

  it('should set status to "fail" if statusCode starts with 4', () => {
    const error = new AppError('something went wrong', 400);

    expect(error.status).toBe('fail');
  });

  it('should capture the stack trace', () => {
    const error = new AppError('something went wrong', 400);

    expect(error.stack).toBeDefined();
  });
});

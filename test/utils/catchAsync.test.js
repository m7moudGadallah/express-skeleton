const { catchAsync } = require('../../src/utils');

describe('catchAsync', () => {
  it('should middleware a function', () => {
    const middleware = catchAsync(() => {});

    expect(typeof middleware).toBe('function');
  });

  it('should catch and pass errors to the next middleware', async () => {
    const error = new Error('something went wrong');

    const fn = async () => {
      throw error;
    };

    const req = {};
    const res = {};
    const next = jest.fn();

    const middleware = catchAsync(fn);
    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it('should not call the next middleware if no error is thrown', async () => {
    const fn = async () => {};

    const req = {};
    const res = {};
    const next = jest.fn();

    const middleware = catchAsync(fn);
    await middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
  });
});

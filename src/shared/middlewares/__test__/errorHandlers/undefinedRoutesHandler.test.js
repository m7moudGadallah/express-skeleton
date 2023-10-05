const undefinedRoutesHandler = require('../../errorHandlers/undefinedRoutesHandler');
const { AppError } = require('../../../helpers');

describe('undefinedRoutesHandler', () => {
  // Mock Express request and response objects
  const req = {};
  const res = {};
  const next = jest.fn();

  it('should call next middleware by passing AppError', () => {
    // Call undefinedRoutesHandler middleware
    const middleware = undefinedRoutesHandler({ AppError });
    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const error = next.mock.calls[0][0];

    expect(error.statusCode).toBe(404);
    expect(error.message).toMatch("Can't find");
  });
});

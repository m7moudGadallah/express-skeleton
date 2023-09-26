const undefinedRoutesHandler = require('../../../src/middlewares/errorHandlers/undefinedRoutesHandler');
const { AppError } = require('../../../src/utils');

describe('undefinedRoutesHandler', () => {
  // Mock Exress request and response objects
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

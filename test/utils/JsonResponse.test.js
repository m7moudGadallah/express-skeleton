const JsonResponse = require('../../src/utils/JsonResponse');

const mockResponse = () => {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.headers = {};

  res.headers.set = jest.fn().mockImplementation((name, value) => {
    res.headers[name] = value;
  });

  res.headers.get = jest.fn().mockImplementation((name) => res.headers[name]);

  res.cookie = jest.fn().mockImplementation((cookieName, token, options) => {
    res.headers.set(
      'Set-Cookie',
      `${cookieName}=${token};Expires=${options.expires}`
    );
  });
  return res;
};

describe('JsonResponse', () => {
  const response = mockResponse();

  it('should construct a new instance of the class', () => {
    const jsonResponse = new JsonResponse(response, 200);

    expect(jsonResponse).toBeInstanceOf(JsonResponse);
  });

  it('should attach a token cookie to the response', () => {
    const jsonResponse = new JsonResponse(response, 200);

    jsonResponse.attachTokenCookie('my-token', 3600, {});

    expect(response.headers.get('Set-Cookie')).toMatch('jwt=my-token');
  });

  it('should set the main content of the response', () => {
    const jsonResponse = new JsonResponse(response, 200);

    jsonResponse.setMainContent(true, 'Request successful').send();

    expect(response.json).toHaveBeenCalledWith({
      success: true,
      message: 'Request successful',
    });
  });

  it('should set the payload of the response for successful requests', () => {
    const jsonResponse = new JsonResponse(response, 200);

    jsonResponse
      .setMainContent(true, 'Request successful')
      .setSuccessPayload({
        token: 'my-token',
        count: 0,
        data: [],
        pagination: {},
      })
      .send();

    expect(response.json).toHaveBeenCalledWith({
      success: true,
      message: 'Request successful',
      payload: {
        token: 'my-token',
        count: 0,
        data: [],
        pagination: {},
      },
    });
  });

  it('should set the payload of the response for failed request', () => {
    const jsonResponse = new JsonResponse(response, 500);

    jsonResponse
      .setMainContent(false, 'Request Failed')
      .setFailedPayload({
        status: 'fail',
        message: 'something wrong',
      })
      .send();

    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: 'Request Failed',
      payload: {
        status: 'fail',
        message: 'something wrong',
      },
    });
  });
});

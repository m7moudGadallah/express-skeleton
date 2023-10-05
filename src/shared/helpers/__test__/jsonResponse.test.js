const JsonResponse = require('../JsonResponse');

/**
 * Create mock response object.
 *
 * @params {void}
 * @returns {Object} A mock response object.
 */
const mockResponse = () => {
  /**
   * Create mock res object
   * Mock status method
   * Mock json method
   * Mock headers
   * Mock headers.set method
   * Mock header.get method
   * Mock cookie method
   * Return mock response object
   */

  // Create mock res object
  const res = {};

  // Mock status method
  res.status = jest.fn().mockReturnValue(res);

  // Mock json method
  res.json = jest.fn().mockReturnValue(res);

  // Mock headers
  res.headers = {};

  // Mock headers.set method
  res.headers.set = jest.fn().mockImplementation((name, value) => {
    res.headers[name] = value;
  });

  // Mock headers.get method
  res.headers.get = jest.fn().mockImplementation((name) => res.headers[name]);

  // Mock cookie method
  res.cookie = jest.fn().mockImplementation((cookieName, token, options) => {
    // Set cookie in header
    res.headers.set(
      'Set-Cookie',
      `${cookieName}=${token};Expires=${options.expires}`
    );
  });

  // Return mock response object
  return res;
};

/**
 * Tests for JsonResponse.
 *
 * Verify that JsonResponse constructs a new instance of the class.
 * Verify that JsonResponse attaches a token cookie to the response.
 * Verify that JsonResponse sets the main content of the response.
 * Verify that JsonResponse sets the payload of the response for successful requests.
 * Verify that JsonResponse sets the error of the response for failed requests.
 * Verify that JsonResponse sets the devError of the response for failed requests.
 * Verify that JsonResponse sends the response.
 */
describe('JsonResponse', () => {
  // Mocked response object
  let response;

  beforeEach(() => {
    // Create mock response object
    response = mockResponse();
  });

  // Verify that JsonResponse constructs a new instance of the class.
  it('should construct a new instance of the class', () => {
    /**
     * Create new instance of JsonResponse
     * Verify that JsonResponse is an instance of JsonResponse
     */

    // Create new instance of JsonResponse
    const jsonResponse = new JsonResponse(response, 200);

    // Verify that JsonResponse is an instance of JsonResponse
    expect(jsonResponse).toBeInstanceOf(JsonResponse);
  });

  // Verify that JsonResponse attaches a token cookie to the response.
  it('should attach a token cookie to the response', () => {
    /**
     * Create new instance of JsonResponse
     * Attach token cookie to the response
     * Verify that the response header contains the token cookie
     */

    // Create new instance of JsonResponse
    const jsonResponse = new JsonResponse(response, 200);

    // Attach token cookie to the response
    jsonResponse.attachTokenCookie('my-token', 3600, {});

    // Verify that the response header contains the token cookie
    expect(response.headers.get('Set-Cookie')).toMatch('jwt=my-token');
  });

  // Verify that JsonResponse sets the main content of the response.
  it('should set the main content of the response', () => {
    /**
     * Create new instance of JsonResponse
     * Set the main content of the response
     * Send the response
     * Verify that the response contains the main content
     */

    // Create new instance of JsonResponse
    const jsonResponse = new JsonResponse(response, 200);

    // Set the main content of the response
    jsonResponse.setMainContent(true, 'Request successful').send();

    // Verify that the response contains the main content
    expect(response.json).toHaveBeenCalledWith({
      success: true,
      message: 'Request successful',
    });
  });

  // Verify that JsonResponse sets the payload of the response for successful requests.
  it('should set the payload of the response for successful requests', () => {
    /**
     * Create new instance of JsonResponse
     * Set the main content of the response
     * Set the payload of the response
     * Send the response
     * Verify that the response contains the payload
     */

    // Create new instance of JsonResponse
    const jsonResponse = new JsonResponse(response, 200);

    // Set the main content of the response
    jsonResponse.setMainContent(true, 'Request successful');

    // Set the payload of the response
    jsonResponse.setPayload({
      token: 'my-token',
      count: 0,
      data: [],
      pagination: {},
    });

    // Send the response
    jsonResponse.send();

    // Verify that the response contains the payload
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

  // Verify that JsonResponse sets the error of the response for failed requests.
  it('should set the error of the response for failed requests', () => {
    /**
     * Create new instance of JsonResponse
     * Set the main content of the response
     * Set the error of the response
     * Send the response
     * Verify that the response contains the error
     */

    // Create new instance of JsonResponse
    const jsonResponse = new JsonResponse(response, 500);

    // Set the main content of the response
    jsonResponse.setMainContent(false, 'Request Failed');

    // Set the error of the response
    jsonResponse.setError({
      status: 'error',
      message: 'something wrong',
    });

    // Send the response
    jsonResponse.send();

    // Verify that the response contains the error
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: 'Request Failed',
      error: {
        status: 'error',
        message: 'something wrong',
      },
    });
  });

  // Verify that JsonResponse sets the devError of the response for failed requests.
  it('should set the devError of the response for failed requests', () => {
    /**
     * Create new instance of JsonResponse
     * Set the main content of the response
     * Set the error of the response
     * Set the devError of the response
     * Send the response
     * Verify that the response contains the error
     */

    // Create new instance of JsonResponse
    const jsonResponse = new JsonResponse(response, 500);

    // Set the main content of the response
    jsonResponse.setMainContent(false, 'Request Failed');

    // Set the error of the response
    jsonResponse.setError(
      {
        status: 'error',
        message: 'something wrong',
      },
      {
        stack: 'Error stack trace',
      }
    );

    // Send the response
    jsonResponse.send();

    // Verify that the response contains the error
    expect(response.json).toHaveBeenCalledWith({
      success: false,
      message: 'Request Failed',
      error: {
        status: 'error',
        message: 'something wrong',
      },
      devError: {
        stack: 'Error stack trace',
      },
    });
  });
});

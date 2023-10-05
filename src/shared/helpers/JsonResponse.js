/**
 * A class for generating standard JSON responses.
 *
 * @class
 * @param {Response} response - The HTTP response object.
 * @param {number} [statusCode=200] - The HTTP status code.
 */
class JsonResponse {
  /**
   * @private
   * @property {Response} #response The HTTP response object.
   */
  #response;

  /**
   * @private
   * @property {Object} #content The main content of the response.
   */
  #content;

  /**
   * Constructs a new `JsonResponse` instance.
   *
   * @param {Response} response - The HTTP response object.
   * @param {number} [statusCode=200] - The HTTP status code.
   *
   * @example
   * const response = new JsonResponse(res, 200);
   */
  constructor(response, statusCode = 200) {
    this.#response = response.status(statusCode);
  }

  /**
   * Attaches a token cookie to the response.
   *
   * @param {string} token - The token to be set in the cookie.
   * @param {number} expiresIn - The number of seconds before the cookie expires.
   * @param {Object} [options] - The cookie options.
   * @param {boolean} [options.secure=false] - Indicates if the cookie should be secure.
   * @param {string} [options.cookieName='jwt'] - The name of the cookie.
   *
   * @example
   * // Attach a secure cookie with a custom name
   * response.attachTokenCookie('my-token', 3600, { secure: true, cookieName: 'my-cookie' });
   * // Attach a non-secure cookie with the default name 'jwt'
   * response.attachTokenCookie('my-token', 3600);
   */
  attachTokenCookie(token, expiresIn, { secure = false, cookieName = 'jwt' }) {
    const cookieOptions = {
      expires: expiresIn,
      httpOnly: true,
    };

    if (secure) {
      cookieOptions.secure = true;
    }

    this.#response.cookie(cookieName, token, cookieOptions);
    return this;
  }

  /**
   * Sets the main content of the response.
   *
   * @param {boolean} success - Indicates the success status of the response.
   * @param {string} message - A message associated with the response.
   *
   * @returns {JsonResponse} The modified `JsonResponse` instance.
   *
   * @example
   * // Set the main content for a successful response
   * response.setMainContent(true, 'Request successful');
   * // Set the main content for a failed response
   * response.setMainContent(false, 'Request failed');
   */
  setMainContent(success, message) {
    this.#content = {
      success,
      message,
    };

    return this;
  }

  /**
   * Sets the payload of the response for successful requests.
   *
   * @param {Object} payload - The payload of the response.
   * @param {string} payload.token - The token for the response.
   * @param {number} payload.count - The count for the response.
   * @param {Object} payload.data - The data for the response.
   * @param {Object} payload.pagination - The pagination for the response.
   *
   * @example
   * response.setPayload({
   *     token: 'my-token',
   *     count: 10,
   *     data: { /* your data object * / },
   *     pagination: { /* pagination object * / },
   * });
   */
  setPayload(payload) {
    this.#content.payload = payload;
    return this;
  }

  /**
   * Sets the payload of the response for failed requests, including an optional development error.
   *
   * @param {Object} error - The error payload of the response.
   * @param {string} error.status - The status of the failed request.
   * @param {string} error.message - The error message.
   * @param {Object} [devError] - An optional development error object.
   * @param {string} [devError.error] - The development error description or code.
   * @param {string} [devError.stack] - The stack trace of the development error.
   *
   * @example
   * response.setError(
   *   {
   *     status: 'Some status',
   *     message: 'Some error message',
   *   },
   *   {
   *     error: 'Development error',
   *     stack: 'Development error stack trace',
   *   }
   * );
   *
   * @returns {Response} The Response object with the error payload.
   */
  setError(error, devError) {
    this.#content.error = error;

    // Add the devError property if it exists in case of development environment only
    if (devError) {
      this.#content.devError = devError;
    }
    return this;
  }

  /**
   * Sends the response to the client.
   *
   * @returns {void}
   *
   * @example
   * response.send();
   */
  send() {
    this.#response.json(this.#content);
  }
}

module.exports = JsonResponse;

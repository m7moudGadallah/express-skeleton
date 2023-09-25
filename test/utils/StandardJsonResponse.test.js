const StandardJsonResponse = require('../../src/utils/StandardJsonResponse');

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

describe('StandardJsonResponse', () => {
    const response = mockResponse();

    it('should construct a new instance of the class', () => {
        const standardJsonResponse = new StandardJsonResponse(response, 200);

        expect(standardJsonResponse).toBeInstanceOf(StandardJsonResponse);
    });

    it('should attach a token cookie to the response', () => {
        const standardJsonResponse = new StandardJsonResponse(response, 200);

        standardJsonResponse.attachTokenCookie('my-token', 3600, {});

        expect(response.headers.get('Set-Cookie')).toMatch('jwt=my-token');
    });

    it('should set the main content of the response', () => {
        const standardJsonResponse = new StandardJsonResponse(response, 200);

        standardJsonResponse.setMainContent(true, 'Request successful').send();

        expect(response.json).toHaveBeenCalledWith({
            success: true,
            message: 'Request successful',
        });
    });

    it('should set the payload of the response for successful requests', () => {
        const standardJsonResponse = new StandardJsonResponse(response, 200);

        standardJsonResponse
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
        const standardJsonResponse = new StandardJsonResponse(response, 500);

        standardJsonResponse
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

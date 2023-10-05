/**
 * Access the current environment mode (e.g., 'development', 'production', 'testing') and rate limit settings.
 * @constant {string} MODE - The current environment mode.
 * @constant {number} RATE_LIMIT_MAX - The maximum number of requests allowed within the rate limit window.
 * @constant {number} RATE_LIMIT_WINDOW_MIN - The rate limit window in minutes.
 * @default {string} MODE - Defaults to 'development' mode if the environment mode is not set.
 */
const { NODE_ENV: MODE, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MIN } = process.env;

// const { rateLimit } = require('express-rate-limit');

/**
 * Configure and apply pre-middlewares to an Express application instance based on the environment mode.
 * @param {Express} app - The Express application instance to which pre-middlewares will be applied.
 * @param {Object} dependencies - An object containing required middleware dependencies.
 * @param {Function} dependencies.morgan - The {@link external:morgan} logger middleware function.
 * @param {Function} dependencies.cookieParser - The {@link external:cookie-parser} middleware function.
 * @param {Function} dependencies.helmet - The {@link external:helmet} middleware function for setting security headers.
 * @param {Function} dependencies.rateLimit - The {@link external:express-rate-limit} middleware function for API rate limiting.
 * @param {Function} dependencies.xss - The {@link external:xss-clean} middleware function for data sanitization against XSS attacks.
 * @param {Function} dependencies.hpp - The {@link external:hpp} middleware function for preventing parameter pollution.
 * @param {Function} dependencies.cors - The {@link external:cors} middleware function for enabling cross-origin resource sharing.
 * @param {Function} dependencies.path - The {@link external:path} module for working with file paths.
 * @param {Function} dependencies.express - The {@link external:express} module for creating Express.js applications.
 */
module.exports = (app, dependencies) => {
  const {
    morgan,
    express,
    cookieParser,
    helmet,
    rateLimit,
    xss,
    hpp,
    cors,
    path,
  } = dependencies;

  /**
   * Apply development-specific pre-middlewares.
   * @function
   * @name module:middlewares/preMiddlewares#applyDevelopmentMiddlewares
   * @param {Express} app - The Express application instance.
   * @param {function} morgan - The Morgan logger middleware function.
   */
  const applyDevelopmentMiddlewares = (app, morgan) => {
    // Log requested endpoints in development mode
    app.use(morgan('dev'));
  };

  // Setting security http headers
  app.use(helmet());

  // Apply pre-middlewares based on the environment
  if ((process.env.NODE_ENV || MODE) === 'development') {
    applyDevelopmentMiddlewares(app, morgan);
  }

  // Parse JSON bodies
  app.use(express.json({ limit: '10kb' }));

  // Parse URL-encoded bodies with extended support and a size limit of 10kb.
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Parse cookies
  app.use(cookieParser());

  // API rate-Limit using express-rate-limit
  const limiter = rateLimit({
    max: RATE_LIMIT_MAX,
    windowMs: Number(RATE_LIMIT_WINDOW_MIN) * 60 * 1000,
    message: {
      status: 'Error',
      message: 'Too many requests from this IP, please try again in an hour!',
    },
  });

  // Apply API rate limiting to the '/api' endpoint.
  app.use('/api', limiter);

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter pollution
  app.use(hpp());

  // Enable CORS
  app.use(cors());

  // Serve static files from the 'public' directory.
  app.use(express.static(path.join(__dirname, '../public')));
};

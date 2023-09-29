module.exports = (app) => {
  // Mount the routes
  // e.g. app.use('/api/v1/users', userRoutes);

  // Default route
  app.use('/', (req, res, next) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to the API 👋',
    });
  });
};

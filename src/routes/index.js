module.exports = (app) => {
  // Default route
  app.use('/api', (req, res, next) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to the API 👋',
    });
  });

  // app.use('/api/v1', require('./v1'));
};

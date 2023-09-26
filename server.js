require('colors');
const database = require('./src/config');
const createApp = require('./src/app');

/**
 * Main entry point for the application.
 *
 * @param {Object} database - The database configuration object.
 * @param {Function} createApp - A function that creates and configures the Express application.
 * @throws {Error} If there's an issue starting the application.
 */

const startApp = (database, createApp) => {
  const { NODE_ENV: MODE, PORT = 3000 } = process.env;

  createApp(database).then((app) => {
    app.listen(PORT, () => {
      console.log(
        'App is running in '.brightMagenta.underline.bold.italic +
          MODE.brightYellow.underline.bold.italic +
          ' mode on port '.brightMagenta.underline.bold.italic +
          PORT.brightYellow.underline.bold.italic +
          ' 🚀...'.brightMagenta.underline.bold.italic
      );
    });
  });
};

// Start the application
startApp(database, createApp);

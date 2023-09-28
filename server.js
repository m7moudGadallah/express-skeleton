const http = require('http');
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

const startApp = async (database, createApp) => {
  const { NODE_ENV: MODE, PORT = 3000 } = process.env;
  /*
  -> first connect to the DB
  -> second create server using http built-in module and pass express app 
     to handle all the commit requests.
  */
  const app = await createApp(database);
  const server = http.createServer(app).listen(PORT, () => {
    console.log(
      'App is running in '.brightMagenta.underline.bold.italic +
        MODE.brightYellow.underline.bold.italic +
        ' mode on port '.brightMagenta.underline.bold.italic +
        PORT.brightYellow.underline.bold.italic +
        ' 🚀...'.brightMagenta.underline.bold.italic
    );
    return server;
  });
};

// Start the application
module.exports = startApp(database, createApp);

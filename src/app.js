// Import dependencies
require('colors');
const express = require('express');
const { middlewaresLoader } = require('./shared');
// const routes = require('./routes');

/**
 * Creates and configures an Express.js application.
 *
 * @function createApp
 * @param {DatabaseManager} databaseManager - The DatabaseManager object used for managing database connection.
 * @returns {Express} An instance of the configured Express application.
 * @throws {Error} If the database connection fails.
 * @example
 * const database = new Database(config);
 * const app = createApp(database);
 */
exports.createApp = async function createApp(databaseManager) {
  // Connect to database
  const DB = await databaseManager.connect();

  console.log(
    '('.cyan.underline.bold.italic +
      databaseManager.databaseName.brightYellow.underline.bold.italic +
      ') Database Connected 🚀...'.cyan.underline.bold.italic
  );

  // Make the database globally accessible
  global.DB = DB;

  // Create express app
  const app = express();

  middlewaresLoader(app).pre();

  // Mount routes
  // routes(app);

  middlewaresLoader(app).post();

  return app;
};

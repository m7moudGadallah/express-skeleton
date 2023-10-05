/**
 * Database manager class for managing database connections.
 *
 * @class DatabaseManager
 */
exports.DatabaseManager = class DatabaseManager {
  /**
   * The single instance of the DatabaseManager class.
   *
   * @private
   * @type {DatabaseManager}
   */
  static #instance;

  /**
   * The database or ORM client object used to interact with the database.
   *
   * @private
   * @type {Object}
   */
  #dbClient;

  /**
   * The name of the database.
   *
   * @public
   * @type {String}
   */
  databaseName;

  /**
   * This attribute holds an instance of the Prisma Client or the database ORM object
   * that is used for interacting with the database.
   *
   * @public
   * @type {Object}
   */
  database;

  /**
   * The connection URL for the database.
   *
   * @private
   * @type {String}
   */
  #connectionURL;

  /**
   * Creates an instance of Database.
   *
   * @param {Object} dbClient - The Prisma Client instance used to interact with the database.
   * @param {Object} options - The database connection options.
   * @memberof DatabaseManager
   */
  constructor(dbClient, options = {}) {
    // Destructure options within the constructor body
    const { databaseURL, databaseName, username, password } = options;

    // If no instance exists, create and store it
    if (!DatabaseManager.#instance) {
      // Set the databaseName as a public attribute
      this.databaseName = databaseName;

      // Initialize other properties
      this.#dbClient = dbClient;

      // Construct the connection URL
      // TODO: Uncomment once you setting this variables in .env
      // this.#connectionURL = databaseURL
      //   .replace('<username>', username)
      //   .replace('<password>', password)
      //   .replace('<DB>', databaseName);

      // Set the database property to null
      this.database = null;

      DatabaseManager.#instance = this;
    }

    // Return the singleton instance
    return DatabaseManager.#instance;
  }

  /**
   * Connects to the database.
   *
   * @returns {Promise} A promise representing the connection.
   */
  async connect() {
    // TODO: Implement database-specific connection logic here
    // Example: For MongoDB, connect using the provided connection URL
    // Example: For Prisma, create a Prisma Client instance
    // Replace this comment with the actual implementation
    // Set this.database to the database client instance
    // Return this.database
    return Promise.resolve(); // Placeholder for connection
  }

  /**
   * Disconnects from the database.
   *
   * @returns {Promise} A promise representing the disconnection.
   */
  async disconnect() {
    // TODO: Implement database-specific disconnection logic here
    // Example: For MongoDB, disconnect the MongoDB connection
    // Example: For Prisma, disconnect the Prisma Client
    // Replace this comment with the actual implementation
    // Disconnect the database client
    // Set this.database to null
    // Return this.database
    return Promise.resolve(); // Placeholder for disconnection
  }
};

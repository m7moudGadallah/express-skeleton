/**
 * Database class for managing database connections.
 *
 * @class Database
 */
class Database {
  /**
   * The single instance of the Database class.
   *
   * @private
   * @type {Database}
   */
  static #instance;

  /**
   * The database or ORM client object used to interact with the database.
   *
   * @private
   * @type {object}
   */
  #dbClient;

  /**
   * The name of the database.
   *
   * @public
   * @type {string}
   */
  databaseName;

  /**
   * The connection URL for the database.
   *
   * @private
   * @type {string}
   */
  #connectionURL;

  /**
   * Creates an instance of Database.
   *
   * @param {object} dbClient - The database or ORM client object used to interact with the database.
   * @param {object} options - The database connection options.
   * @memberof Database
   */
  constructor(dbClient, options = {}) {
    // Destructure options within the constructor body
    const { databaseURL, databaseName, databasePassword } = options;

    // If no instance exists, create and store it
    if (!Database.#instance) {
      // Set the databaseName as a public attribute
      this.databaseName = databaseName;

      // Initialize other properties
      this.#dbClient = dbClient;

      // Construct the connection URL
      //   TODO CONSTRUCT THE CORRECT URL
      // Commented to prevent runtime error

      //   this.#connectionURL = databaseURL
      //     .replace('<DB>', databaseName)
      //     .replace('<password>', databasePassword);

      Database.#instance = this;
    }

    // Return the singleton instance
    return Database.#instance;
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
    return Promise.resolve(); // Placeholder for disconnection
  }
}

module.exports = Database;

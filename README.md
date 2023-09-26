# express-skeleton

## Table of Content

<!-- TOC -->

- [express-skeleton](#express-skeleton)
  - [Table of Content](#table-of-content)
  - [Introduction](#introduction)
  - [Directory Structure](#directory-structure)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

<!-- /TOC -->

## Introduction

This is a project skeleton for building Node.js applications with the Express.js framework. It provides a well-organized structure, predefined middleware, and error handling configurations to jumpstart your web development projects.

## Directory Structure

- `src`: The main source directory containing the core application code.

  - `app.js`: The main application file.
  - `config`: Configuration files for the application.
  - `middlewares`: Middleware functions used in the application.
    - `preMiddlewares.js`: Pre-route middlewares, including sanitizers, loggers, security middlewares, body parsing, etc.
    - `postMiddlewares.js`: Post-route middlewares, including error handling middlewares.
    - `customMiddlewares`: Custom middlewares created by developers, such as authorization middlewares.
  - `public`: Directory for static and media files, like images.
  - `resources`: Resource-specific directories, each containing:
    - `resource_name.controller.js`: Controller logic for the resource.
    - `resource_name.service.js`: Service layer for the resource.
    - `resource_name.routes.js`: Routes configuration for the resource.
  - `routes`: Main route files, organizing resources under their respective versions (e.g., `v1`, `v2`, etc.).
  - `utils`: Utility modules for the application.
    - `APIFeatures.js`: Module for parsing and transforming query strings, handling filtration, selection, sorting, and pagination.
    - `AppError.js`: Module for creating custom error classes.
    - `catchAsync.js`: Utility for handling asynchronous functions.
    - `JsonResponse.js`: Module for structuring JSON responses consistently.

- `config`: Configuration files.

  - `Database.js`: A class for managing database connections and exposing functions to connect and disconnect using the singleton design pattern.
  - `index.js`: Reads environment variables from `.env` and instantiates the Database class.

- `.env`: Contains environment variables used by the application.

- `test`: Directory for testing files (not yet implemented in this skeleton).

**[&uarr; Top](#express-skeleton)**

## Prerequisites

- Node.js and npm installed.

**[&uarr; Top](#express-skeleton)**

## Getting Started

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Set environment variables in the `.env` file.
4. Start the server:

   - **Development Mode:** Run `npm run start:dev` to start the server with nodemon for automatic reloading during development.
   - **Production Mode:** Run `npm run start:prod` to start the server in production mode.

**Testing:**

- Run tests using Jest:
  - `npm test`: Run tests in the testing environment.
  - `npm run test:coverage`: Run tests with code coverage report.

**[&uarr; Top](#express-skeleton)**

## Usage

- Define your routes, controllers, and services in the `resources` directory.
- Customize middleware in the `middlewares/customMiddlewares` directory.
- Configure database connections in `config/Database.js`.
- Implement custom error handling in `middlewares/errorHandlers/dberrorcustomizer`.

## Contributing

Contributions are welcome!

**Here is a list of contributors:**

- Mahmoud Gadallah ([Github](https://github.com/m7moudGadallah) | [Linkdin](https://www.linkedin.com/in/m7moudgadallah/))
- Marwan Radwan ([Github](https://github.com/MarwanRadwan7) | [Linkdin](https://www.linkedin.com/in/marwan-radwan))

## License

This project is licensed under the [LICENSE](LICENSE).

## Contact

For questions or support, please contact [Mahmoud Gadallah](https://www.linkedin.com/in/m7moudgadallah/).

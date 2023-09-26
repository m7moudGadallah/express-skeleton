/**
 * A utility class for parsing and manipulating query parameters for API features.
 */
class APIFeatures {
  #reqQuery;

  /**
   * Create an instance of APIFeatures.
   * @param {object} reqQuery - The request query object containing the query parameters.
   * @param {string[]} [excludedFields=[]] - An array of field names to be excluded from the query parameters.
   */
  constructor(reqQuery, excludedFields = []) {
    this.#reqQuery = reqQuery;
    this.excludedFields = excludedFields.length
      ? excludedFields
      : ['page', 'sort', 'limit', 'fields', 'select'];
  }

  /**
   * Parse and prepare the filter options from the request query.
   * @returns {object} The filter options object to be used in a MongoDB query.
   */
  parseFilterOptions() {
    // make a copy from reqQuery and delete excludedFields
    let queryObj = { ...this.#reqQuery };
    this.excludedFields.forEach((field) => delete queryObj[field]);

    // Match (gt|gte|lt|lte|eq|ne|in|nin)
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gt|gte|lt|lte|eq|ne|in|nin)\b/g,
      (match) => `$${match}`
    );

    // Parse the modified query string
    queryObj = JSON.parse(queryStr);

    // Convert in and nin values to arrays
    const convertValuesToArray = (subKey) => {
      Object.keys(queryObj).forEach((key) => {
        if (queryObj[key][subKey]) {
          queryObj[key][subKey] = queryObj[key][subKey].split(',');
        }
      });
    };

    // Convert in values to arrays
    convertValuesToArray('$in');

    // Convert in values to arrays
    convertValuesToArray('$nin');

    return queryObj;
  }

  /**
   * Parse and prepare the sort options from the request query.
   * @method
   * @param {string} [fields=''] - Comma-separated list of fields to sort by.
   * @returns {string} The sort options array to be used in a MongoDB query.
   */
  parseSortOptions(fields = '_id') {
    if (this.#reqQuery.sort) return this.#reqQuery.sort.split(',').join(' ');
    return fields.split(',').join(' ');
  }

  /**
   * Parse and prepare the select options from the request query.
   * @method
   * @param {string} [fields=''] - Comma-separated list of fields to include in the query results.
   * @returns {string} The select options array to be used in a MongoDB query.
   */
  parseSelectOptions(fields = '') {
    // console.log(this.#reqQuery.fields);
    if (this.#reqQuery.fields)
      return this.#reqQuery.fields.split(',').join(' ');
    if (this.#reqQuery.select)
      return this.#reqQuery.select.split(',').join(' ');
    if (fields) return fields.split(',');

    return '-__v';
  }

  static createPaginationObject(page, limit, total) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};

    // fill pagination object
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        pageSize: limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        pageSize: limit,
      };
    }

    return pagination;
  }
}

module.exports = APIFeatures;

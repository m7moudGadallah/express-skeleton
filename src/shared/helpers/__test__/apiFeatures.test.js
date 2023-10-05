const APIFeatures = require('../apiFeatures');

/**
 * Tests for APIFeatures.
 *
 * Verify that APIFeatures construct a new instance of the class.
 * Verify that parseFilterOptions already parses and prepares filter operations and returns object for parsed options..
 * Verify that parseSortOptions already parses and prepares sort options and returns string.
 * Verify that parseSelectOptions already parses and prepares select options and return string.
 * Verify that createPaginationObject already creates a pagination object.
 */
describe('APIFeatures', () => {
  // Example request query for testing
  const exampleRequest = {
    query: {
      sort: '-price,-ratingsAverage',
      'ratingsAverage[gte]': '4.7',
      'labels[in]': 'easy',
      fields: 'price,ratingsAverage,duration',
      page: '1',
      limit: '10',
    },
  };

  // Verify that APIFeatures construct a new instance of the class.
  it('should construct a new instance of the APIFeatures class', () => {
    /**
     * Create an instance of APIFeatures for testing.
     * Verify that the instance is an instance of the APIFeatures class.
     */

    // Create an instance of APIFeatures for testing.
    const apiFeatures = new APIFeatures(exampleRequest.query);

    // Verify that the instance is an instance of the APIFeatures class.
    expect(apiFeatures).toBeInstanceOf(APIFeatures);
  });

  // Verify that parseFilterOptions already parses and prepares filter operations and returns object for parsed options.
  it('should parse and prepare filter options and return filter object', () => {
    /**
     * Create an instance of APIFeatures for testing.
     * Call the parseFilterOptions method.
     * Verify that the filter object is defined.
     * Verify that the filter object matches the expected filter options.
     */

    // Create an instance of APIFeatures for testing.
    const apiFeatures = new APIFeatures(exampleRequest.query);

    // Call the parseFilterOptions method.
    const filter = apiFeatures.parseFilterOptions();

    // Verify that the filter object is defined.
    expect(filter).toBeDefined();

    // Verify that the filter object matches the expected filter options.
    expect(filter).toMatchObject({
      'ratingsAverage[$gte]': '4.7',
      'labels[$in]': 'easy',
    });
  });

  // Verify that parseSortOptions already parses and prepares sort options and returns string.
  it('should parse and prepare sort options', () => {
    /**
     * Create an instance of APIFeatures for testing.
     * Call the parseSortOptions method.
     * Verify that the sort options is defined.
     * Verify that the sort options matches the expected sort options.
     */

    // Create an instance of APIFeatures for testing.
    const apiFeatures = new APIFeatures(exampleRequest.query);

    // Call the parseSortOptions method.
    const sortOptions = apiFeatures.parseSortOptions();

    // Verify that the sort options is defined.
    expect(sortOptions).toBeDefined();

    // Verify that the sort options matches the expected sort options.
    expect(sortOptions).toBe('-price -ratingsAverage');
  });

  // Verify that parseSelectOptions already parses and prepares select options and return string.
  it('should parse and prepare custom select options', () => {
    /**
     * Create an instance of APIFeatures for testing.
     * Call the parseSelectOptions method.
     * Verify that the select options is defined.
     * Verify that the select options matches the expected select options.
     */

    // Create an instance of APIFeatures for testing.
    const apiFeatures = new APIFeatures(exampleRequest.query);

    // Call the parseSelectOptions method.
    const selectOptions = apiFeatures.parseSelectOptions();

    // Verify that the select options is defined.
    expect(selectOptions).toBeDefined();

    // Verify that the select options matches the expected select options.
    expect(selectOptions).toBe('price ratingsAverage duration');
  });

  // Verify that createPaginationObject already creates a pagination object.
  describe('createPaginationObject', () => {
    // Verify that createPaginationObject already creates a pagination object with next and prev properties.
    it('should create pagination object with next and prev properties', () => {
      /**
       * set page, limit, and total.
       * Call the createPaginationObject method.
       * Verify that the pagination object is defined.
       * Verify that the pagination object matches the expected pagination object.
       */

      // set page, limit, and total.
      const page = 2;
      const limit = 10;
      const total = 29;
      const expectedPagination = {
        prev: { page: 1, pageSize: 10 },
        next: { page: 3, pageSize: 9 },
      };

      // Create a Pagination object.
      const pagination = APIFeatures.createPaginationObject(page, limit, total);

      // Verify that the pagination object is defined.
      expect(pagination).toBeDefined();

      // Verify that the pagination object matches the expected pagination object.
      expect(pagination).toEqual(expectedPagination);
    });

    // Verify that createPaginationObject already creates a pagination object with only next property.
    it('should create pagination object with only next property', () => {
      /**
       * set page, limit, and total.
       * Call the createPaginationObject method.
       * Verify that the pagination object is defined.
       * Verify that the pagination object matches the expected pagination object.
       */

      // set page, limit, and total.
      const page = 1;
      const limit = 10;
      const total = 30;
      const expectedPagination = {
        next: { page: 2, pageSize: 10 },
      };

      // Create a Pagination object.
      const pagination = APIFeatures.createPaginationObject(page, limit, total);

      // Verify that the pagination object is defined.
      expect(pagination).toBeDefined();

      // Verify that the pagination object matches the expected pagination object.
      expect(pagination).toEqual(expectedPagination);
    });

    // Verify that createPaginationObject already creates a pagination object with only prev property.
    it('should create pagination object with only prev property', () => {
      /**
       * set page, limit, and total.
       * Call the createPaginationObject method.
       * Verify that the pagination object is defined.
       * Verify that the pagination object matches the expected pagination object.
       */

      // set page, limit, and total.
      const page = 3;
      const limit = 10;
      const total = 30;
      const expectedPagination = {
        prev: { page: 2, pageSize: 10 },
      };

      // Create a Pagination object.
      const pagination = APIFeatures.createPaginationObject(page, limit, total);

      // Verify that the pagination object is defined.
      expect(pagination).toBeDefined();

      // Verify that the pagination object matches the expected pagination object.
      expect(pagination).toEqual(expectedPagination);
    });
  });
});

const { APIFeatures } = require('../../src/utils');

describe('APIFeatures Class', () => {
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

  it('should construct a new instance of the class', () => {
    const apifeatures = new APIFeatures(exampleRequest.query);

    expect(apifeatures).toBeInstanceOf(APIFeatures);
  });

  // Create an instance of APIFeatures for testing
  const apiFeatures = new APIFeatures(exampleRequest.query);

  // Test parseFilterOptions method
  describe('parseFilterOptions', () => {
    it('should parse and prepare filter options and return filter object', () => {
      const filter = apiFeatures.parseFilterOptions();
      const expectedFilterOptions = {
        'ratingsAverage[$gte]': '4.7',
        'labels[$in]': 'easy',
      };

      expect(filter).toBeDefined();
      expect(filter).toMatchObject(expectedFilterOptions);
    });
  });

  // Test parseSortOptions method
  describe('parseSortOptions', () => {
    it('should parse and prepare sort options', () => {
      const sortOptions = apiFeatures.parseSortOptions();
      const expectedSortOptions = '-price -ratingsAverage';

      expect(sortOptions).toBeDefined();
      expect(sortOptions).toBe(expectedSortOptions);
    });
  });

  // Test parseSelectOptions method
  describe('parseSelectOptions', () => {
    it('should parse and prepare custom select options', () => {
      const selectOptions = apiFeatures.parseSelectOptions();
      const expectedSelectOptions = 'price ratingsAverage duration';

      expect(selectOptions).toBeDefined();
      expect(selectOptions).toBe(expectedSelectOptions);
    });
  });

  // Test createPaginationObject method
  describe('createPaginationObject', () => {
    it('should create pagination object with next and prev properties', () => {
      const page = 2;
      const limit = 10;
      const total = 30;

      const expectedPagination = {
        next: { page: 3, pageSize: 10 },
        prev: { page: 1, pageSize: 10 },
      };

      const pagination = APIFeatures.createPaginationObject(page, limit, total);

      expect(pagination).toBeDefined();
      expect(pagination).toEqual(expectedPagination);
    });

    it('should create pagination object with only next property', () => {
      const page = 1;
      const limit = 10;
      const total = 30;
      const expectedPagination = {
        next: { page: 2, pageSize: 10 },
      };

      const pagination = APIFeatures.createPaginationObject(page, limit, total);

      expect(pagination).toBeDefined();
      expect(pagination).toEqual(expectedPagination);
    });

    it('should create pagination object with only prev property', () => {
      const page = 3;
      const limit = 10;
      const total = 30;
      const expectedPagination = {
        prev: { page: 2, pageSize: 10 },
      };

      const pagination = APIFeatures.createPaginationObject(page, limit, total);

      expect(pagination).toBeDefined();
      expect(pagination).toEqual(expectedPagination);
    });
  });
});

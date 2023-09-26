const createApp = require('../src/app');

describe('createApp', () => {
  const database = {
    connect: jest.fn().mockResolvedValue(),
    disconnect: jest.fn().mockResolvedValue(),
    databaseName: 'test',
  };

  it('should return an Express application instance', async () => {
    // Call the createApp function with the mocked database object
    const app = await createApp(database);

    // Assert that returned app is an instance of Express
    expect(app).toHaveProperty('listen');
  });
});

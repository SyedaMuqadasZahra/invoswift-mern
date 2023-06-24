const request = require('supertest');
const { app } = require('../app');
const { server } = require('../bin/www');

describe('Testing App', () => {
  it('will render home page', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200);
  });

  afterAll(() => {
    server.close();
  });
});

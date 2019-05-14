const request = require('supertest');
const {
  server
} = require('../../src/container');

const app = server.start();

after(async () => {
  await server.stop();
});

describe('health endpoints', () => {
  describe(`GET /readiness`, () => {
    it('returns a 200 when server has started', () => {
      request(app)
        .get(`/api/readiness`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.body).to.deep.equal({ ping: 'pong' });
        });
    });
  });

  describe(`GET /liveness`, () => {
    it('returns a 200 when server has started', () => {
      request(app)
        .get(`/api/liveness`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.body).to.deep.equal({ ping: 'pong' });
        });
    });
  });
});
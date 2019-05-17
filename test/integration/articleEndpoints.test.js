const request = require('supertest');
const mongoDbHelper = require('../integration/utils/mongodb');

describe('health endpoints', () => {
  // afterEach(() => {
  //   mongoDbHelper.clearDb();
  // });
  describe(`GET /readiness`, () => {
    describe('when there are articles in the database', () => {
      before(() => {
        const article = {
          title: 'Integration Test Article',
          author: 'Abi',
          articleBody: 'This is an integration test',
        };
        mongoDbHelper.createArticles(article);
      });
      it('returns a 200 and the articles', () => {
        request(global.app)
          .get(`/api/getAllArticles`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(response => {
            const firstArticle = response.body.articles[0];
            expect(firstArticle).to.have.property(
              'title',
              'Integration Test Article',
            );
            expect(firstArticle).to.have.property('author', 'Abi');
            expect(firstArticle).to.have.property(
              'articleBody',
              'This is an integration test',
            );
          });
      });
    });
  });
});
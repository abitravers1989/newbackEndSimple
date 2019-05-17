const request = require('supertest');
const mongoDbHelper = require('../integration/utils/mongodb');

describe('Article endpoints', () => {
  // afterEach(() => {
  //   mongoDbHelper.clearDb();
  // });
  describe(`GET /api/getAllArticles`, () => {
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
              'title'
            );
            expect(firstArticle).to.have.property('author', 'Abi');
            expect(firstArticle).to.have.property(
              'articleBody'
            );
          });
      });
    });
  });

  describe(`GET /api/getArticle`, async  () => {
    describe('when the article with the provided ID is in the database', () => {
      before(() => {
        const article = {
          title: 'Integration Test Article Two',
          author: 'Abi',
          articleBody: 'This is an integration test for getting one article.',
        };
        mongoDbHelper.createArticles(article);
      });
      it('returns a 200 and the requested article', () => {
        // request(global.app)
        //   .get(`/api/getAllArticles`)
        //   .expect(200)
        //   .expect('Content-Type', /json/)
        //   .then(response => {
        //     const firstArticle = response.body.articles[0];
        //     expect(firstArticle).to.have.property(
        //       'title',
        //       'Integration Test Article',
        //     );
        //     expect(firstArticle).to.have.property('author', 'Abi');
        //     expect(firstArticle).to.have.property(
        //       'articleBody',
        //       'This is an integration test',
        //     );
        //   });
      });
    });
  });
});
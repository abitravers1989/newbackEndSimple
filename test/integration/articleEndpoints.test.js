const request = require('supertest');
const mongoDbHelper = require('../integration/utils/mongodb');

describe.only('Article endpoints', () => {
  afterEach(() => {
    mongoDbHelper.clearDb();
  });
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
        return request(global.app)
          .get(`/api/getAllArticles`)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(response => {
            const firstArticle = response.body.articles[0];
            expect(firstArticle).to.have.property(
              'title', 'Integration Test Article'
            );
            expect(firstArticle).to.have.property('author', 'Abi');
            expect(firstArticle).to.have.property(
              'articleBody', 'This is an integration test'
            );
          });
      });
    });
  });

  describe(`GET /api/getArticle`, async  () => {
    describe('when the article with the provided ID is in the database', () => {
      const testTitle = 'Integration Test Article Two'
      before(() => {
        const article = {
          title: testTitle,
          author: 'Abi',
          articleBody: 'This is an integration test for getting one article.',
        };
        mongoDbHelper.createArticles(article);
      });
      //console.log('----->', mongoDbHelper.getAllArticles())
      it('returns a 200 and the requested article', () => {
        return request(global.app)
                .get(`/api/getAllArticles`)
                .then(mongoDbHelper.getArticleID(testTitle))
                // .then( () => {
                //   const thing= mongoDbHelper.getArticleID(testTitle)
                //   console.log('----->',thing )})
      
      });
    });
  });
});
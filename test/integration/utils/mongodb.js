const { mongodb, mongoose } = require('../../../src/container');

module.exports = {
  createArticles: article => {
    const Article = mongoose.model('Article');
    const { title, articleBody, author } = article;
    const newArticleData = new Article({ title, articleBody, author });
    try {
      newArticleData.save();
    } catch (err) {
      console.log('An error happened in the mongo utils:', err);
    }
  },
  clearDb: () => {
    const Article = mongoose.model('Article');
    Article.remove({}, err => {
      if (err) {
        throw new Error('Error deleting all the articles', err);
      }
      console.log('Deleted Articles');
    });
  },
};

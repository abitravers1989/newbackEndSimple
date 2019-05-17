const { mongoose, articleSchema} = require('../../../src/container');

module.exports = {
  createArticles: (article) => {
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
    Article.remove({}, (err) => {
      if (err) {
        throw new Error('Error deleting all the articles', err);
      }
      console.log('Deleted Articles');
    });
  },
  getArticleID: (articleTitle) => {
    const Article = mongoose.model('Article');
    return Article.find({'title': articleTitle}, (err, article) => {
      console.log('----->article', article)
      return article
    })
  }
  // getAllArticles: async () => {
  //   const Article = mongoose.model('Article');
  //   let returnedArticles;
  //   // return (
  //     Article.find()
  //       .then((articles) => {
  //         console.log('----->', articles);
  //         returnedArticles = articles;
 
  //       })
  //       .catch((err) => {
  //         console.log('There was an error:', err);
  //       })
  //   return returnedArticles;
  //   // );
  // }
};

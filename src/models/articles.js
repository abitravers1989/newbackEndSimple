module.exports = () => ({
      createArticleSchema: () => {
          const mongoose = require('mongoose');
          var articlesSchema = new mongoose.Schema({
              title: String,
              articleBody: String,
              author: String,
            });
          const Article = mongoose.model('Article', articlesSchema);
          return Article;
      }
});
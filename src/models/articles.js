module.exports = ({mongoose}) => ({
      createArticleSchema: () => {
          var articlesSchema = new mongoose.Schema({
              title: String,
              articleBody: String,
              author: String,
            });
          const Article = mongoose.model('Article', articlesSchema);
          return Article;
      }
});
module.exports = ({ mongoose, articleValidation }) => ({
  create: async (req, res) => {
    const { body } = req;
    const { password } = req.headers;
    const { title, articleBody, author } = body;
    const Article = mongoose.model('Article');

    if (
      (await articleValidation.isUnique(title, Article)) &&
      articleValidation.isValidPassword(password) &&
      articleValidation.isValid(body)
    ) {
      const newArticleData = new Article({ title, articleBody, author });
      newArticleData.save().catch(error => {
        res
          .status(400)
          .json(
            { Error: 'Encountered an error while saving:' },
            { GivenError: error },
          );
      });
      return res.status(200).json({
        status: 'Successfully posted:',
        title,
        articleBody,
        author,
      });
    }
    return res.status(400).json({
      Error: 'Post must be unique & valid with the correct password',
    });
  },

  getAll: (req, res) => {
    const Article = mongoose.model('Article');
    if (!Article) {
      res.status(404).send('Article collection not found');
    }
    return (
      Article.find()
        // Sort so the last Article posted will be first in the list
        .sort({ createdAt: -1 })
        .then(articles =>
          res.json({ articles: articles.map(article => article.toJSON()) }),
        )
        .catch(err => {
          res.status(400).json(
            {
              Error:
                'Encountered an error while attempting to fetch all articles:',
            },
            { GivenError: err },
          );
        })
    );
  },

  getById: (req, res) => {
    const Article = mongoose.model('Article');
    return Article.findById(req.query.id, (err, article) => {
      if (err) {
        return res.status(400).json({ Error: err });
      }
      if (!article) {
        return res.status(404).json({ Error: 'Article not found' });
      }
      return res.status(200).json({ article });
    });
  },

  deleteArticleByID: (req, res) => {
    const Article = mongoose.model('Article');
    if (articleValidation.isValidPassword(req.headers.password)) {
      Article.findByIdAndRemove(req.query.id)
        .then(result =>
          res.status(200).json({
            status: `successfully deleted Article: ID: ${result.id},  TITLE: ${
              result.title
            }, ARTICLE_BODY: ${result.articleBody}`,
          }),
        )
        .catch(err => res.status(400).json({ Error: err }));
    }
  },

  // add get by title
  editByTitle: async (req, res) => {
    const requestTitle = req.query.title;
    const { body } = req.body;
    const { title, articleBody, author } = body;
    const Article = mongoose.model('Article');
    const newArticle = { title, articleBody, author };

    if (await articleValidation.isUnique(requestTitle, Article)) {
      res.status(400).json({
        Error: 'Article does not exist in current database',
      });
    }

    if (
      (await articleValidation.isUnique(title, Article)) &&
      articleValidation.isValidPassword(req.headers.password) &&
      articleValidation.isValid(body)
    ) {
      Article.findOneAndUpdate(
        { title: requestTitle },
        newArticle,
        (err, article) => {
          if (err) {
            return res.status(400).json({
              Error: `Error updating article: ${err}`,
            });
          }
          return res.status(200).json({
            status: 'Successfully updates the article:',
            article,
          });
        },
      );
    } else {
      res.status(400).json({
        Error:
          'Password must be in the header of the request, the new title must be unique and the article must be valid.',
      });
    }
  },

  deleteAll: (req, res) => {
    const Article = mongoose.model('Article');
    Article.remove({}, err => {
      if (err) {
        throw new Error('Error deleting all the articles', err);
      } else {
        res.end('Deleted all articles in the collection');
      }
    });
  },
});

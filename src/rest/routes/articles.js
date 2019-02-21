module.exports = ({ mongoose, articlevalidation, sanitise }) => {
  return {
    create: async (req, res) => {
      const { body } = req
      const { password } = req.headers
      const { title, articleBody, author } = body
      const Article = mongoose.model('Article')

      if (
        (await articlevalidation.isUnique(title, Article)) &&
        articlevalidation.isValidPassword(password) &&
        articlevalidation.isvaid(body)
      ) {
        // add sanatize
        const newArticleData = new Article({ title, articleBody, author })
        newArticleData.save().catch(error => {
          res
            .status(400)
            .json(
              { Error: 'Encountered an error while saving:' },
              { GivenError: error }
            )
        })
        return res.status(200).json({
          status: 'Successfully posted:',
          title,
          articleBody,
          author
        })
      }
      return res.status(400).json({
        Error: 'Post must be unique & valid with the correct password'
      })
    },

    getAll: (req, res) => {
      const Article = mongoose.model('Article')
      if (!Article) {
        res.status(404).send('Article collection not found')
      }
      return (
        Article.find()
          // Sort so the last Article posted will be first in the list
          .sort({ createdAt: -1 })
          .then(articles =>
            res.json({ articles: articles.map(article => article.toJSON()) })
          )
          .catch(err => {
            res.status(400).json(
              {
                Error:
                  'Encountered an error while attempting to fetch all articles:'
              },
              { GivenError: err }
            )
          })
      )
    },

    getbyId: (req, res) => {
      const Article = mongoose.model('Article')
      return Article.findById(req.query.id, (err, article) => {
        if (err) {
          return res.status(400).json({ Error: err })
        }
        if (!article) {
          return res.status(404).json({ Error: 'Article not found' })
        }
        return res.status(200).json({ article })
      })
    },

    deleteArticlebyID: (req, res) => {
      const Article = mongoose.model('Article')
      // TODO add authentication
      return Article.findByIdAndRemove(req.query.id)
        .then(result => {
          res.status(200).json({
            status: `successfully deleted Article: ID: ${result.id},  TITLE: ${
              result.title
            }, ARTICLE_BODY: ${result.articleBody}`
          })
        })
        .catch(err => {
          console.log(`unable to deleteArticle with provided ID`, err)
        })
    },

    // add get by title

    editByTitle: (req, res) => {
      const requestTitle = req.query.title

      const body = sanitise(req.body)
      const { title, articleBody, author } = body

      if (!articlevalidation.isvaid(body)) {
        res.status(422).json({
          error: {
            message: 'A valid article must be posted'
          }
        })
      }

      const Article = mongoose.model('Article')
      const newArticle = { title, articleBody, author }

      // have to find and then save
      // Article.findOne({})
      Article.findOne({ title: requestTitle })
        // .sort({ createdAt: 'descending' })
        .then(articles => {
          console.log('----->Article is', articles)
          if (!articles) {
            // console.log('----->', 'No Article found with that title')
            return res.json({
              status:
                'No Article found with that title. Please ensure it exists.'
            })
          }
          console.log('----->', newArticle)
          Article.findOneAndUpdate(
            { title: requestTitle },
            newArticle,
            (err, article2) => {
              if (err) {
                console.error('Error updating article:', title, err)
              } else {
                // or article
                return res.json({
                  status: 'Successfully updates the article:',
                  article2
                })
                // return res.json({status: 'Successfully updates the article:', requestTitle, newArticle})
              }
            }
          )
        })
        .catch(err => {
          console.log('Unable to find and update given article', err)
        })
    },

    deleteAll: (req, res) => {
      const Article = mongoose.model('Article')
      Article.remove({}, err => {
        if (err) {
          throw new Error('Error deleting all the articles', err)
        } else {
          res.end('deleted all articles in the collection')
        }
      })
    }
  }
}

module.exports = ({ mongoose, articlevalidation, sanitise }) => {
  return {
    create: async (req, res) => {
      const { body } = req
      const { password } = req.headers
      const { title, articleBody, author } = body
      const Article = mongoose.model('Article')

      const uniqueArticle = await articlevalidation.isUnique(title, Article)
      const userValid = articlevalidation.isValidPassword(password)
      const articleValid = articlevalidation.isvaid(body)

      if (uniqueArticle && userValid && articleValid) {
        // promisify
        // add sanatize
        const newArticleData = new Article({ title, articleBody, author })
        newArticleData
          .save()
          .then(result => {
            console.log('Saved:', result)
          })
          .catch(error => {
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
        Error:
          'Post must be unique & valid with the correct password to be posted'
      })
    },

    get: (req, res) => {
      const Article = mongoose.model('Article')
      if (!Article) {
        res.status(404)
      }
      return (
        Article.find()
          // change to created at
          .sort({ title: 1 })
          .then(articles =>
            res.json({ articles: articles.map(article => article.toJSON()) })
          )
          .catch(err => {
            console.log('unable to get all articles because', err)
          })
      )
    },

    // TODO refactor this out so can be used twice. app.param should be used
    // findArticleByID: (req, res, next) => {
    //   const Article = mongoose.model('Article');
    //   const idFromReq = req.query.id;
    //   return Article.findById(idFromReq, (err, article) => {
    //     if(err) {
    //       return res.status(404).json({error: err})
    //     } else if (article) {
    //       req.article = article;
    //       // const art = req.article
    //       // res.status(200).json({art})
    //       return next();
    //     }
    //   });
    // },

    getbyId: (req, res, next) => {
      const Article = mongoose.model('Article')
      const idFromReq = req.query.id
      return Article.findById(idFromReq, (err, article) => {
        if (err) {
          res.status(404).json({ error: err })
          return next(err)
        }
        if (!article) {
          return next(new Error('Article not found'))
        }
        if (article) {
          res.status(200).json({ article })
          return next()
        }
      })
    },

    // add get by title

    deleteArticlebyID: (req, res) => {
      const Article = mongoose.model('Article')
      // TODO validate query.id
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

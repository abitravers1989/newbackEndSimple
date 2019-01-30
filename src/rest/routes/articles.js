module.exports = ({ mongoose, articlevalidation}) => { 
  return {
//TODO ADD CREATEDAT TO SCHEMA 
    create: (req, res) => {
      const { body } = req;  
      articlevalidation.isvaid(body);
      const { title, articleBody, author } = body;
      const Article = mongoose.model('Article');
      Article.findOne({title}, (err, article) => {
        if(err) {
          res.status(404).json({error: err});
          return next(error);
        };
        if(!article){
          //promisify
          const newArticleData = new Article({ title, articleBody, author});
          newArticleData.save().then(result => {
            console.log('saved')
          }).catch(err => {
            console.log('unable to save')
          }); 
         res.status(200).json({ status: 'successfully posted:', title, articleBody, author });
        } else {
          res.status(400).json({Error: 'To post an article it must have a unique title'})
        }
      })
    },

    get: (req, res, next) => {
      const Article = mongoose.model('Article');  
      if(!Article) {
        res.status(404)
      }
      return Article.find()
      .sort({ createdAt: 'descending' })
      .then((articles) => 
        res.json({articles: articles.map(article => article.toJSON()) 
      })).catch(err => {
        console.log('unable to get all articles because', err)
      });   
    },

    //TODO refactor this out so can be used twice. app.param should be used
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
      const Article = mongoose.model('Article');  
      const idFromReq = req.query.id;
      return Article.findById(idFromReq, (err, article) => {
        if(err) {
          res.status(404).json({error: err});
          return next(error);
        };
        if(!article) {
          return next(new Error('Article not found'))
        }
        else if (article) {
          res.status(200).json({article});
          return next();
        }
      }); 
    },

    deleteArticlebyID: (req, res) => { 
      const Article = mongoose.model('Article'); 
      //TODO validate query.id
      return Article.findByIdAndRemove(req.query.id)
      .then(result => {
        res.status(200).json({status: `successfully deleted Article: ID: ${result.id},  TITLE: ${result.title}, ARTICLE_BODY: ${result.articleBody}`})
      }).catch(err => {
        console.log(`unable to deleteArticle with provided ID`, err)
      });
    },

    editByTitle: (req, res, next) => {
      const requestTitle = req.query.title;
      const { body } = req;
      const { title, articleBody, author } = body;

      if(title === 'undefined') {
        //err is already an error so doesn't need wrapping
        throw new Error('POST req body needs a title')
      }
      if(articleBody === 'undefined') {
        throw new Error('POST req needs an articleBody')
      }
      if(author === 'undefined') {
        throw new Error('POST req needs an author')
      }

      const Article = mongoose.model('Article');
      const newArticle = new Article({ title, articleBody, author});
      
      Article.find({title: requestTitle})
      .sort({ createdAt: 'descending' })
      .then((articles) => {
        if (!articles[0]) {
          console.log('----->', "No Article found with that title")
          return res.json({status: 'No Article found with that title. Please ensure it exists.'});
        } else { 
          Article.findOneAndUpdate({requestTitle}, {newArticle}, (err, article) => { 
            if(err) {
              console.error('Error updating article:', title, err)
            } else {
              //or article
              return res.json({status: 'Successfully updates the article:', requestTitle, newArticle})
            }
          });
        }
      }).catch(err => {
        console.log('Unable to find and update given article', err)
      });
    },   

    deleteAll: (req, res) => {
      const Article = mongoose.model('Article');
      Article.remove({}, err => {
        if(err) {
          throw new Error('Error deleting all the articles', err)
        } else {
          res.end('deleted all articles in the collection')
        }
      })
    },
  }
};

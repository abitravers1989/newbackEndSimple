
module.exports = ({ mongoose, articlevalidation}) => { 
  return {

    create: (req, res) => {
      const { body } = req;  
      articlevalidation.isvaid(body);
      const { title, articleBody, author } = body;
      const Article = mongoose.model('Article'); 
      const articleData = new Article({ title, articleBody, author});
      articleData.save().then(result => {
        console.log('saved')
      }).catch(err => {
        console.log('unable to save')
      }); 
      res.status(200).json({ status: 'successfully posted:', title, articleBody, author });
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
      const Article = mongoose.model('Article');
      const title = req.query.title;
      const { body } = req; 
      // this is not working
      //articlevalidation.isvaid(body);
      if(typeof body.title !== 'undefined') {
        console.log('working')
        req.article.title = body.title;
      } else {
        throw new Error('post body needs a title')
      }
      res.status(200).json({status: title});
    },

  }
};

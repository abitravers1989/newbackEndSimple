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
      let article = new Object;
      console.log(body.title)
      if(typeof body.title !== 'undefined') {
        article.title = body.title;
        //article.title = body.title;
      } else {
        throw new Error('POST req body needs a title')
      }
      if(typeof body.articleBody !== 'undefined') {
        article.articleBody = body.articleBody;
      } else {
        throw new Error('POST req needs an articleBody')
      }
      if(typeof body.author !== 'undefined') {
        article.author = body.author;
      } else {
        throw new Error('POST req needs an author')
      }



      console.log(article)
      //add whitespace where see %
    //find the article with that title 
    //replace the article with that title with the new article object
      res.status(200).json({status: title});
    },

  }
};


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
      return Article.find()
      .sort({ createdAt: 'descending' })
      .then((articles) => 
        res.json({articles: articles.map(article => article.toJSON()) 
      })).catch(err => {
        console.log('unable to get all articles because', err)
      });   
    },

    getById: (req, res) => {
     // const Article = mongoose.model('Article');
     console.log('params are', req.query.title)
     res.status(200).json({ status: 'successfully posted:' });
      // Article.findById(req.params._id, (err, article) =>{
      //   if(err) { res.send(err) }
      //   res.status(200).json(article)
      // })
    },

    deleteArticle: (req, res) => { 
      const Article = mongoose.model('Article'); 
      //TODO validate query.id
      return Article.findByIdAndRemove(req.query.id)
      .then(result => {
        res.status(200).json({status: `successfully deleted Article with given id: ${req.query.id}` })
      }).catch(err => {
        console.log(`unable to deleteArticle with provided ID`, err)
      });
    },
  }
};

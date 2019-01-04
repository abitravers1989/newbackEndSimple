
module.exports = ({ mongoose, articlevalidation}) => { 
  return {
    create: (req, res) => {
     const { body } = req;  
      articlevalidation.isvaid(body);

      // try {
        const { title, articleBody, author } = body;
        const Article = mongoose.model('Article'); 
        var articleData = new Article({ title, articleBody, author});
        articleData.save().then(result => {
            console.log('saved')
         }).catch(err => {
             console.log('unable to save')
         }); 
      // } catch(err) {
      //   //replace with logger
      //   console.log(`An error occured while trying to save the article to the db:`, err)
      // }
      res.status(200).json({ status: 'successfully posted:', title, articleBody, author });
    },
    get: (req, res, next) => {
      // try {
        const Article = mongoose.model('Article');  
        return Article.find()
          .sort({ createdAt: 'descending' })
          .then((articles) => res.json({articles: articles.map(article => article.toJSON()) }))
          .catch(next);
      // } catch(err) {
      //   //replace with logger
      //   console.log(`An error occured while trying to get all articles from the db:`, err)
      // }    
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
      return Article.findByIdAndRemove(req.query.id)
      .then(result => {
        res.status(200).json({status: `successfully deleted Article with id: ${req.query.id}` })
      }).catch(err => {
        console.log(`unable to delete: ${req.query.id}`, err)
      });
    },
  }
};

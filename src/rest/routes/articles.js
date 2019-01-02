
module.exports = ({ mongoose }) => { 
  return {
    create: (req, res) => {
     const { body } = req;
      try {
        if(!body.title) {
          return res.status(422).json({
              error: {
                  title: 'is required',
              },
          });
        }
        if(!body.articleBody) {
          return res.status(422).json({
              error: {
                articleBody: 'is required',
              },
          });
        }
        if(!body.author) {
          return res.status(422).json({
              error: {
                  author: 'is required',
              },
          });
        }
      } catch(err) {
        return new Error('title, postBody and author must be in the post body');
      }   


      try {
        const { title, articleBody, author } = body;
        const Article = mongoose.model('Article'); 
        var articleData = new Article({ title, articleBody, author});
        articleData.save().then(result => {
            console.log('saved')
         }).catch(err => {
             console.log('unable to save')
         }); 
      } catch(err) {
        //replace with logger
        console.log(`An error occured while trying to save the article to the db:`, err)
      }
      res.status(200).json({ status: 'successfully posted:', title, articleBody, author });
    },
    get: (req, res, next) => {
      try {
        console.log('hhhhhhhhhhhhhhhh')
        const Article = mongoose.model('Article');  
        return Article.find()
          .sort({ createdAt: 'descending' })
          .then((articles) => res.json({articles: articles.map(article => article.toJSON()) }))
          .catch(next);
      } catch(err) {
        //replace with logger
        console.log(`An error occured while trying to get all articles from the db:`, err)
      }    
    },
    // getById: (req, res) => {
    //  // const Article = mongoose.model('Article');
    //   console.log(req.params);
    //   // Article.findById(req.params._id, (err, article) =>{
    //   //   if(err) { res.send(err) }
    //   //   res.status(200).json(article);
    //   // })
    // }
  }
};


module.exports = ({ mongoose }) => {
  
  return {
    get: (req, res) => {
      
      var monk = require('monk');
      var db = monk('localhost:27017/blogSite')

      var collection = db.get('articles');

      collection.find({}, {}, function (err, docs) {
          res.status(200).json({ ping: docs })
      });
    },
    // find: (req, res) => {
    //   try {
    //     const article = { title: 'Create an Express add with mongoDB', 
    //     body: 'A post on how to TDD an express app with dependency injection and a mongo DB', 
    //     author: 'abi'};
    //     res.status(200).json(article);
    //   } catch (err) {
    //     return new Error('articles not found');
    //   }
    // },
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
      
     const Article = mongoose.model('Article')
     const { title, articleBody, author } = body;

     var articleData = new Article({ title, articleBody, author});
     articleData.save().then(result => {
         console.log('saved')
      }).catch(err => {
          console.log('unable to save')
      }); 
      res.status(200).json({ status: 'successfully posted:', title, articleBody, author });
    },
  }
};

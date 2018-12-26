
module.exports = (articleDbModel, mongoose) => {
  return {
    get: (req, res) => {
      var monk = require('monk');
      var db = monk('localhost:27017/blogSite')

      var collection = db.get('posts');

      collection.find({}, {}, function (err, docs) {
          res.status(200).json({ ping: docs })
      });
    },
    find: (req, res) => {
      try {
        const article = { title: 'Create an Express add with mongoDB', 
        body: 'A post on how to TDD an express app with dependency injection and a mongo DB', 
        author: 'abi'};
        res.status(200).json(article);
      } catch (err) {
        return new Error('articles not found');
      }
    },
    create: (req, res, next) => {
     // const mongodb = require('./repositories/mongodb');
      //const Post = mongodb().createPostSchema();

        // var postSchema = new mongoose.Schema({body: String});
                // var Post = mongoose.model('Post', postSchema);

                // var postData = new Post({body: 'Working to save posts'});
                // postData.save().then(result => {
                //     console.log('saved')
                // }).catch(err => {
                //     console.log('unable to save')
                // });
      console.log(req.body);
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
      const { title, articleBody, author } = body;
      res.status(200).json({ status: 'successfully posted:', title, articleBody, author });
    },
  }
};

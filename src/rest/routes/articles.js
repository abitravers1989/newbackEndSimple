// module.exports = () => ({
//     find: (req, res) => res.status(200).json({ ping: 'pong' })
// });


module.exports = () => ({
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
    create: (req, res) => {
      // console.log('req body is   :,', req.header)
      //// const Articles = mongoose.model('Articles')
      console.log(req);
      const { body } = req;
      try {
        if(!body.title) {
          return res.status(422).json({
              error: {
                  title: 'is required',
              },
          });
        }
        if(!body.postBody) {
          return res.status(422).json({
              error: {
                  body: 'is required',
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

      const { title, postBody, author } = body;
      res.status(200).json({ status: 'successfully posted:', title, postBody, author });
    },
  });



// try {
//     const article = { title: 'Create an Express add with mongoDB', body: 'A post on how to TDD an express app with dependency injection and a mongo DB', author: 'abi'};
//     res.send(article)
// } catch (err) {
//     return new Error('articles not found')
// }




    // create: (req, res, next) => {
    //     // const Articles = mongoose.model('Articles')
    //     const { body } = req;
    //     if(!body.title) {
    //         return res.status(422).json({
    //             errors: {
    //                 title: 'is required',
    //             },
    //         });
    //     }
    //     if(!body.postBody) {
    //         return res.status(422).json({
    //             errors: {
    //                 body: 'is required',
    //             },
    //         });
    //     }
    //     if(!body.author) {
    //         return res.status(422).json({
    //             errors: {
    //                 author: 'is required',
    //             },
    //         });
    //     }

    //     const { title, postBody, author } = body;

    //     const postedArticle = new Articles(body);
    //     return postedArticle.save()
    //         .then(() => res.json({ article: postedArticle.toJSON() }))
    //         .catch(next);
    // }

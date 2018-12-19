// module.exports = () => ({
//     find: (req, res) => res.status(200).json({ ping: 'pong' })
// });


module.exports = () => ({
    find: (req, res) => res.status(200).json({ ping: 'pong' }),
  });


// const article = { title: 'Create an Express add with mongoDB', 
//         body: 'A post on how to TDD an express app with dependency injection and a mongo DB', 
//         author: 'abi'};
//         res.status(200).json(article);

// try {
//     const article = { title: 'Create an Express add with mongoDB', body: 'A post on how to TDD an express app with dependency injection and a mongo DB', author: 'abi'};
//     res.send(article)
// } catch (err) {
//     return new Error('articles not found')
// }




    // create: (req, res, next) => {
    //     const Articles = mongoose.model('Articles')
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

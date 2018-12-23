module.exports = ({ app, envVariables, morgan, logger, routes, bodyParser, promisify, cors, helmet,  articleEndpoint }) => {
    let server;
    return {
        start: () => {
            try {
                app.use(morgan('dev', {
                    skip: (req, res) => {
                        return res.statusCode < 400
                    }, stream: process.stderr
                }));

                app.use(morgan('dev', {
                    skip: (req, res) => {
                        return res.statusCode >= 400
                    }, stream: process.stdout
                }));

                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({ extended: true }));
               // app.use(cors());

                //add routes 
                routes.setupEndpoints(app);

                app.use((err, req, res, next) => {
                    new Error('An error occured in the app: ', err);
                    res.status(500).send('There was an issue in the app:', err)
                });

                const mongoose = require('mongoose');
// //!!!!!!!!!!! reafctor this into a repository file with a start method and a ctahc for the error
//                 //add database
                mongoose.connect('mongodb://localhost:27017/blogSite', { useNewUrlParser: true });
                mongoose.Promise = global.Promise;
                mongoose.set('debug', true);
//                 // Get the default connection
//                 const db = mongoose.connection;
//                 //bind the connection to an error event to get notifications of connection errors 
//                 db.on('error', console.error.bind(console, 'MongoDB connection error:'));
              
                var postSchema = new mongoose.Schema({body: String});
                var Post = mongoose.model('Post', postSchema);

                var postData = new Post({body: 'Working to save posts'});
                postData.save().then(result => {
                    console.log('saved')
                }).catch(err => {
                    console.log('unable to save')
                });

                // Post.find({}, (err, posts) => {
                //     console.log(posts)
                // })
                 

//!!!!!!!!!!!!!!
                
                // var monk = require('monk');
                // var db = monk('localhost:27017/blogSite')

                // var collection = db.get('posts');

                // collection.find({}, {}, function (err, docs) {
                //     console.log(docs)
                // })

                //startup the server
                server = app.listen(envVariables.PORT, () => {
                    logger.info(`listening on port ${server.address().port}`)
                }); 

            } catch (err) {
                logger.error(err, 'Failed to start server');
                process.exit(1)
            }
            return server;
        },
        stop: async () => {
            try {
                await promisify(server.close).call(server);
                logger.info('Shutting down the server successfully')
            } catch (err) {
                logger.error({err}, 'Forcing server to shut down');
                process.exit(1);
            };
        },
    };
};




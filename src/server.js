module.exports = ({ app, envVariables, morgan, logger, routes, bodyParser, mongoose, promisify, articleEndpoint }) => {
    let server;
    return {
        start: () => {
            process.on('uncaughtException', (err) => {
                console.error('Unhandled Exception', err)
              })
              
              process.on('uncaughtRejection', (err, promise) => {
                console.error('Unhandled Rejection', err)
              })

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

                //add routes 

                // app.use(routes.setupEndpoints(app))
                routes.setupEndpoints(app);
                   //http://localhost:3000/api/postArticles
                
                // app.use()
                // app.post('/api/postArticles', articleEndpoint.create);

                app.use((err, req, res, next) => {
                    new Error('An error occured in the app: ', err);
                    res.status(500).send('There was an issue in the app')
                });

                app.post('/api', (req, res) => {
                    console.log(req)
                    res.render('request is:  ', req)
                })

                //add database
                mongoose.connect('mongodb://localhost/blogSite', { useNewUrlParser: true });
                mongoose.set('debug', true);

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




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

                //connect to the database
                const mongodb = require('./repositories/mongodb');
                mongodb().connect();

                //create the schema
                const articleSchema = require('./models/articles');
                articleSchema().createArticleSchema();

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




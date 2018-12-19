module.exports = ({ app, envVariables, morgan, logger, routes, bodyParser, mongoose, promisify }) => {
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

                //app.use(bodyParser.json());

                //add routes 
                routes.setupEndpoints(app);

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




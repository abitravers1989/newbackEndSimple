module.exports = ({ app, envVariables, morgan, logger, promisify, healthEndpoint, mongoose, articleEndpoint, bodyParser }) => {
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

                ///!!!!!!! need to refactor these to index.js !!!!!

                //app.use(bodyParser.json());

                //http://localhost:3000/api/readiness
                app.use('/api/readiness', healthEndpoint.readiness);

                //http://localhost:3000/api/liveness
                app.use('/api/liveness', healthEndpoint.liveness);

                app.get(['/private/readiness', '/private/liveness'], (req, res) =>
                    res.status(200).json({ ping: 'pong' }),
                );

                app.get('*', (req, res) => {
                    res.render('error')
                })

                app.post('/api/getArticle', articleEndpoint.find)

                ///!!!!!!! need to refactor these to index.js !!!!!

                //add database

                mongoose.connect('mongodb://localhost/blogSite', { useNewUrlParser: true });
                mongoose.set('debug', true);

                server = app.listen(envVariables.PORT, () => {
                    logger.info(`listening on port ${server.address().port}`)
                }); 
            } catch (err) {
                logger.error(err, 'Failed to start server')
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




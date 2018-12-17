module.exports = ({ app, envVariables, morgan, logger, promisify }) => {
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
                server = app.listen(envVariables.PORT, () => {
                    logger.info(`listening on port ${server.address().port}`)
                    //console.log((`listening on port ${server.address().port}`))
                }); 
            } catch (err) {
                logger.fatal(err, 'Failed to start server')
                process.exit(1)
            }
            return server;
        },
        stop: async () => {
            try {
                await promisify(server.close).call(server);
                logger.info('Shutting down the server successfully')
            } catch (err) {
                logger.fatal({err}, 'Forcing server to shut down');
                process.exit(1);
            }
        },
    }
}


//HAVING PROBLEMS WITHY THE LOGGER



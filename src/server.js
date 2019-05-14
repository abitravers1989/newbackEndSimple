module.exports = ({
  app,
  envVariables,
  logger,
  routes,
  middleware,
  mongodb,
  articleSchema,
  promisify,
}) => {
  let server;

  return {
    start: () => {
      try {
        middleware.init();
        routes.setupEndpoints(app);

        // Database setup
        mongodb.connect();
        articleSchema.createArticleSchema();

        // Start server
        server = app.listen(envVariables.PORT, () => {
          logger.info(`listening on port ${server.address().port}`);
        });
      } catch (err) {
        logger.error(err, 'Failed to start server');
        process.exit(1);
      }
      return server;
    },
    stop: async () => {
      try {
        await promisify(server.close).call(server);
        logger.info('Shutting down the service gracefully');
        setTimeout(() => {
          process.exit(0)
        },1000);
      } catch (error) {
        logger.error(error, 'Forcing server to shut down');
        process.exit(1);
      }
    },
  };
};

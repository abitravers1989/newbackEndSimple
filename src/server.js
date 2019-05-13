module.exports = ({
  app,
  envVariables,
  logger,
  routes,
  middleware,
  mongodb,
  articleSchema,
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
    stop: () => {
      try {
        server.close();
        logger.info('Shutting down the service gracefully');
      } catch (error) {
        logger.error(error, 'Forcing server to shut down');
        process.exit(1);
      }
    },
  };
};

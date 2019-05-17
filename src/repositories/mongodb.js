module.exports = ({ envVariables, logger }) => ({
  connect: () => {
    try {
      const mongoose = require('mongoose');
      if (envVariables.NODE_ENV === 'test') {
        mongoose.connect(`mongodb:${envVariables.TEST_CONNECTION_STRING}`, {
          useNewUrlParser: true
        });
        logger.info(`Connected to mongo test database: ${envVariables.TEST_CONNECTION_STRING}`);
      } else {
        mongoose.connect(`mongodb:${envVariables.CONNECTION_STRING}`, {
          useNewUrlParser: true
        });
        logger.info(`Connected to mongo development or prod database: ${envVariables.CONNECTION_STRING}`);
      }
      // mongoose.Promise = global.Promise
      mongoose.set('debug', true);
      // Get the default connection
      const db = mongoose.connection;
      // bind the connection to an error event to get notifications of connection errors
      db.on('error', logger.error('MongoDB connection error:'));
      // return db;
    } catch (err) {
      logger.error(
        `An error occurred trying to connect to mongo:${
          err.message
        }.`,
      );
    }
  }
});

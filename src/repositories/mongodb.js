module.exports = ({ envVariables, logger }) => ({
  connect: () => {
    try {
      const mongoose = require('mongoose');
      mongoose.connect(`mongodb:${envVariables.CONNECTION_STRING}`, {
        useNewUrlParser: true,
      });
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
  },
});

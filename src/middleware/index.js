module.exports = ({ app, morgan, bodyParser, logger }) => ({
  init: () => {
    app.use(
      morgan('dev', {
        skip: (req, res) => res.statusCode < 400,
        stream: process.stderr,
      }),
    );

    app.use(
      morgan('dev', {
        skip: (req, res) => res.statusCode >= 400,
        stream: process.stdout,
      }),
    );
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((err, req, res, next) => {
      res.setHeader('Content-Type', 'application/json');
      logger.error(err.message);
      return res.status(err.status || err.statusCode || 500).json({
        message: err.message,
        type: err.type,
        name: err.name,
      });
    });
  },
});
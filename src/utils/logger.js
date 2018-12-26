module.exports = (app) => {
    const winston = require('winston');
    let logger;
    const level = process.env.LOG_LEVEL || 'info';

    logger = new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: level,
                timestamp: function () {
                    return (new Date()).toISOString();
                },
                handleExceptions: true,
                colorize: true
            }),
            new winston.transports.File({
                level: level,
                filename: '../logs/all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB,
                maxFiles: 5,
                colorize: false
            })
        ],
        exitOnError: false
    }),
    logger.stream = {
        write: (message, encoding) => {
            logger.info(message);
        }
    };
    app.use(morgan('combined', {'stream': logger.stream}));

    return logger;
}
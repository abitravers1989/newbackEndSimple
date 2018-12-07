module.exports = ({ winston }) => {
    let logger;
    const level = process.env.LOG_LEVEL || 'info';

    logger = new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: level,
                timestamp: function () {
                    return (new Date()).toISOString();
                }
            })
        ]
    })
    return logger;
}
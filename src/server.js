module.exports = ({ app, envVariables, logger }) => {
    return {
        start: () => {
            try {
                app.listen(envVariables.PORT, () => {
                    app.emit('listened', null)
                }) 
                
                app.on('listened', () => {
                    console.log(`listening on port ${envVariables.PORT}`)
                    logger.info(`listening on port ${envVariables.PORT}`)
                })  
            } catch (err) {
                logger.error(err, 'Failed to start server')
                process.exit()
            }
        }
    }
}


module.exports = ({ app, envVariables, morgan, logger }) => {
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
                console.log('coming in here?')
                server = app.listen(envVariables.PORT, () => {
                    logger.info(`listening on port ${server.address().port}`)
                    //console.log((`listening on port ${server.address().port}`))
                }); 
            } catch (err) {
                logger.fatal(err, 'Failed to start server')
                process.exit(1)
            }
            return server, app;
        }
    }
}


//HAVING PROBLEMS WITHY THE LOGGER

// try {
//     functionWithACallback(objectParameter, callbackFunction() => {
//         checkTheValidityOfObjectParameter
//         callbackFunction();
//     })
// } catch (err) {
//     logger.fatal(err, 'Error while executing callbackFunction');
//     process.exit(1);
// }

// expect(invokeFunctionWhichWillThrowAnErrorHERE).to.throw(TypeError)


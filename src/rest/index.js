module.exports = ({ healthEndpoint, articleEndpoint, logger }) => ({
    setupEndpoints: (app) => {
        try {
            //http://localhost:3000/api/readiness
            app.use('/api/readiness', healthEndpoint.readiness);

            //http://localhost:3000/api/liveness
            app.use('/api/liveness', healthEndpoint.liveness);

            app.get(['/private/readiness', '/private/liveness'], (req, res) =>
                res.status(200).json({ ping: 'pong' }),
            );

            app.get('/api/getArticle', articleEndpoint.find);

            app.get('*', (req, res) => {
                res.render('error')
            });
        } catch (err) {
            logger.error(err, 'Failed to setup app routes');
        }
    }
})
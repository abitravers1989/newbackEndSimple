module.exports = ({ healthEndpoint, articleEndpoint, logger }) => ({
    setupEndpoints: (app) => {
        try {
            //http://localhost:3000/api/readiness
            app.get('/api/readiness', healthEndpoint.readiness);

            //http://localhost:3000/api/liveness
            app.get('/api/liveness', healthEndpoint.liveness);

            //http://localhost:3000/api/trygetArticles
            app.get('/api/trygetArticles', articleEndpoint.get);

            //http://localhost:3000/api/getArticles
            app.get('/api/getArticles', articleEndpoint.find);

            //http://localhost:3000/api/postArticles
            app.post('/api/postArticles', articleEndpoint.create);

            app.get(['/private/readiness', '/private/liveness'], (req, res) =>
                res.status(200).json({ ping: 'pong' }),
            );

            app.get('*', (req, res) => {
                res.render('error')
            });
        } catch (err) {
            logger.error(err, 'Failed to setup app routes');
        }
    }
})
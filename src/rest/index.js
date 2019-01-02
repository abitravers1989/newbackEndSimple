module.exports = ({ healthEndpoint, articleEndpoint, logger }) => ({
    setupEndpoints: (app) => {
        try {
            //http://localhost:3000/api/readiness
            app.get('/api/readiness', healthEndpoint.readiness);

            //http://localhost:3000/api/liveness
            app.get('/api/liveness', healthEndpoint.liveness);

            //http://localhost:3000/api/getAllArticles
            app.get('/api/getAllArticles', articleEndpoint.get);

            //http://localhost:3000/api/postArticles
            app.post('/api/postArticles', articleEndpoint.create);

            //http://localhost:3000/api/id
           // app.get('api/getArticle', articleEndpoint.getById);

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
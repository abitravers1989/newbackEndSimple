module.exports = ({ healthEndpoint, articleEndpoint }) => ({
    setupEndpoints: (express) => {
        try {
            //http://localhost:3000/api/readiness
            express.use('/api/readiness', healthEndpoint.readiness);

            //http://localhost:3000/api/liveness
            express.use('/api/liveness', healthEndpoint.liveness);

            express.get(['/private/readiness', '/private/liveness'], (req, res) =>
                res.status(200).json({ ping: 'pong' }),
            );

            express.get('/api/getArticle', articleEndpoint.find);

            express.get('*', (req, res) => {
                res.render('error')
            });
        } catch (err) {
            logger.error(err, 'Failed to setup app routes');
        }
    }
})
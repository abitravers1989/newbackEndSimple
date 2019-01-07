module.exports = ({ healthEndpoint, articleEndpoint, logger }) => ({
    setupEndpoints: (app) => {
        try {
            //LIVELINESS & READINESS ENDPOINTS
            //http://localhost:3000/api/readiness
            app.get('/api/readiness', healthEndpoint.readiness);

            //http://localhost:3000/api/liveness
            app.get('/api/liveness', healthEndpoint.liveness);

            //ARTICLE ENDPOINTS
            //http://localhost:3000/api/getAllArticles
            app.get('/api/getAllArticles', articleEndpoint.get);

            //POST  http://localhost:3000/api/postArticles
            app.post('/api/postArticles', articleEndpoint.create);

            //http://localhost:3000/api/getArticle?id=5c260405b72fac1f24283e89
            app.get('/api/getArticle', articleEndpoint.getbyId);

            //DELETE  http://localhost:3000/api/id?id=5c1938eab5c54772905d0b26
            app.delete('/api/id', articleEndpoint.deleteArticlebyID);

            //PUT  http://localhost:3000/api/editArticle
            app.put('/api/editArticle', (req, res) => {
                res.status(200).json({status: `successfully deleted Article with given id:`})
            })

            app.get('*', (req, res) => {
                res.render('error')
            });

            //TODO refactor this into utils middleware 
            app.use((err, req, res, next) => {
                res.status(err.status || 500).json({
                    message: err.message,
                    error: err
                });
            });

        } catch (err) {
            console.log('error setting up routes', err)
            logger.error(err, 'Failed to setup app routes');
        }
    }
})
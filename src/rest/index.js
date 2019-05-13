module.exports = ({ healthEndpoint, articleEndpoint, logger }) => ({
  setupEndpoints: app => {
    try {
      // LIVELINESS & READINESS ENDPOINTS
      // http://localhost:3000/api/readiness
      app.get('/api/readiness', healthEndpoint.readiness)

      // http://localhost:3000/api/liveness
      app.get('/api/liveness', healthEndpoint.liveness)

      // ARTICLE ENDPOINTS
      // http://localhost:3000/api/getAllArticles
      app.get('/api/getAllArticles', articleEndpoint.getAll)

      // POST  http://localhost:3000/api/postArticles / include password in header
      app.post('/api/postArticles', articleEndpoint.create)

      // http://localhost:3000/api/getArticle?id=5c6ee6e6c7ce4832513c9c28
      app.get('/api/getArticle', articleEndpoint.getById)

      // DELETE  http://localhost:3000/api/deleteOne?id=5c6ee62586852c3174ab9e8d / include password in header
      app.delete('/api/deleteOne', articleEndpoint.deleteArticleByID)

      // PUT  http://localhost:3000/api/editArticle?title=Test title / include password in header
      app.put('/api/editArticle', articleEndpoint.editByTitle)

      // DELETE  http://localhost:3000/api/deleteAll
      app.delete('/api/deleteAll', articleEndpoint.deleteAll)

      // TODO refactor this into utils middleware
      app.use((err, req, res) => {
        res.status(err.status || 500).json({
          message: err.message,
          error: err
        })
      })
    } catch (err) {
      //   console.error('Error setting up routes', err)
      logger.error(err, 'Failed to setup app routes')
    }
  }
})

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

      // DELETE  http://localhost:3000/api/deleteOne?id=5cdaf12364c9c7936dbc435c / include password in header
      app.delete('/api/deleteOne', articleEndpoint.deleteArticleByID)

      //Not working?
      // PUT  http://localhost:3000/api/editArticle?title=Test title / include password in header
      app.put('/api/editArticle', articleEndpoint.editByTitle)

      // DELETE  http://localhost:3000/api/deleteAll
      app.delete('/api/deleteAll', articleEndpoint.deleteAll)

    } catch (err) {
      logger.error(err, 'Failed to setup app routes')
    }
  }
})

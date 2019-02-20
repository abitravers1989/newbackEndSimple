module.exports = ({ mongoose }) => ({
  createArticleSchema: () => {
    const articlesSchema = new mongoose.Schema(
      {
        title: String,
        articleBody: String,
        author: String
      },
      { timestamps: true }
    )
    const Article = mongoose.model('Article', articlesSchema)
    return Article
  }
})

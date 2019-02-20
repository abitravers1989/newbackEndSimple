module.exports = mongoose => {
  return {
    // TODO validation to check title is unique
    isvaid: bodyOfrequest => {
      try {
        if (
          !bodyOfrequest.title ||
          !bodyOfrequest.articleBody ||
          !bodyOfrequest.author
        ) {
          return false
        }
        return true
      } catch (err) {
        return new Error('title, postBody and author must be in the post body')
      }
    },

    isUnique: title => {
      try {
        const Article = mongoose.model('Article')
        return Article.findOne({ title }, (err, article) => {
          if (err) {
            return new Error('There is an issue with the findOne method:', err)
          }
          if (!article) {
            return true
          }
          return false
        })
      } catch (err) {
        return new Error('Article must be unquie')
      }
    }
  }
}

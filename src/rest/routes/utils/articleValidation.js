module.exports = getEnvVar => {
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

    isUnique: (title, Article) => {
      // const Article = mongoose.model('Article')
      // console.log('----->Article', Article)
      Article.findOne({ title }, (err, article) => {
        if (err) {
          return new Error('There is an issue with the findOne method:', err)
        }
        if (!article) {
          return true
          // return (result = true)
        }
        console.log('----->FALSSSSE')
        return false
        // return (result = false)
      })

      // oputput true or false ???
    },

    isValidPassword: password => {
      return password === getEnvVar('USER_PASSWORD')
    }
  }
}

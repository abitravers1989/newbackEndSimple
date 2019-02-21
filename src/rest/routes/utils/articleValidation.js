module.exports = ({ envVariables }) => {
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

    isUnique: async (title, Article) => {
      const existentArticle = await Article.findOne({ title })
      if (existentArticle) {
        return false
      }
      return true
    },

    isValidPassword: password => {
      return password === envVariables.USER_PASSWORD
    }
  }
}

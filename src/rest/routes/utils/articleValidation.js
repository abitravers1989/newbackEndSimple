module.exports = ({ envVariables }) => {
  return {
    
    isValid: bodyOfRequest => {
      try {
        if (
          !bodyOfRequest.title ||
          !bodyOfRequest.articleBody ||
          !bodyOfRequest.author
        ) {
          return false
        }
        return true
      } catch (err) {
        return new Error('Title, postBody and author must be in the post body')
      }
    },

    isUnique: async (title, Article) => {
      try {
        const existentArticle = await Article.findOne({ title })
        if (existentArticle) {
          return false
        }
        return true
      } catch (err) {
        throw new Error('To post an article it must have a unique title')
      }
    },

    isValidPassword: password => {
      try {
        return password === envVariables.USER_PASSWORD
      } catch (err) {
        throw new Error('To post an article you must be an authenticated user')
      }
    }
  }
}

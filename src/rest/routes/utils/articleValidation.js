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

    isUnique: async (title, Article) => {
      const car = await Article.findOne({ title })
      console.log('----->CAR', car)
      if (car) {
        return false
      }
      return true
    }

    // isValidPassword: password => {
    //   return password === getEnvVar('USER_PASSWORD')
    // }
  }
}

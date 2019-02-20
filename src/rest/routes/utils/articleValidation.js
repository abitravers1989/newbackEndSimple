module.exports = () => {
  return {
    // TODO validation to check title is unique
    isvaid: (bodyOfrequest, res) => {
      try {
        if (!bodyOfrequest.title) {
          return res.status(422).json({
            error: {
              title: 'is required'
            }
          })
        }
        if (!bodyOfrequest.articleBody) {
          return res.status(422).json({
            error: {
              articleBody: 'is required'
            }
          })
        }
        if (!bodyOfrequest.author) {
          return res.status(422).json({
            error: {
              author: 'is required'
            }
          })
        }
        return bodyOfrequest
      } catch (err) {
        return new Error('title, postBody and author must be in the post body')
      }
    }
  }
}

// ADD validation which checks no

// THEN FIX GET BY ID

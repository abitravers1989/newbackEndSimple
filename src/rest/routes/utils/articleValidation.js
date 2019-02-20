module.exports = () => {
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
    }
  }
}

// ADD validation which checks no

// THEN FIX GET BY ID

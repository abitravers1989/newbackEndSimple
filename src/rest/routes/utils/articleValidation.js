module.exports = () => { 
    return {
      isvaid: (bodyOfrequest) => {
        try {
          if(!bodyOfrequest.title) {
            return res.status(422).json({
                error: {
                    title: 'is required',
                },
            });
          }
          if(!bodyOfrequest.articleBody) {
            return res.status(422).json({
                error: {
                  articleBody: 'is required',
                },
            });
          }
          if(!bodyOfrequest.author) {
            return res.status(422).json({
                error: {
                    author: 'is required',
                },
            });
          }
          return bodyOfrequest;
        } catch(err) {
          return new Error('title, postBody and author must be in the post body');
        } 
      },
    }
  };
  

  //REFACTORING OUT VALIDATION

  //THEN FIX GET BY ID
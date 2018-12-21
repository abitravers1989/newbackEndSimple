module.exports = ( mongoose ) => {
    const Schema = mongoose.Schema;
    const articlesSchema = new Schema({
        title: { 
          type: String,
          unique: true
        },
        articleBody: { 
          type: String,
          unique: true
        },
        author: { 
          type: String,
          unique: true
        },
    });

    // ArticlesSchema.methods.toJSON = () => {
    //     return {
    //         _id: this._id,
    //         title: this.title,
    //         body: this.body,
    //         author: this.author,
    //         createdAt: this.createdAt,
    //         updatedAt: this.updatedAt,
    //     };
    // };
    // return mongoose.model('Articles', ArticlesSchema)

    const articleModel = mongoose.model('Articles', articlesSchema);
    return articleModel;
};

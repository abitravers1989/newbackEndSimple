module.exports = ( { mongoose }) => {
    const { Schema } = mongoose;
    const ArticlesSchema = new Schema({
        title: String,
        body: String,
        author: String,
    }, { timestamps: true });

    ArticlesSchema.methods.toJSON = () => {
        return {
            _id: this._id,
            title: this.title,
            body: this.body,
            author: this.author,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    };
    return mongoose.model('Articles', ArticlesSchema)
};
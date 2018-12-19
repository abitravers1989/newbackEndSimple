// module.exports = ( { mongoose }) => {
//     const { Schema } = mongoose;
//     const ArticlesSchema = new Schema({
//         title: String,
//         body: String,
//         author: String,
//     }, { timestamps: true });

//     ArticlesSchema.methods.toJSON = () => {
//         return {
//             _id: this._id,
//             title: this.title,
//             body: this.body,
//             author: this.author,
//             createdAt: this.createdAt,
//             updatedAt: this.updatedAt,
//         };
//     };
//     return mongoose.model('Articles', ArticlesSchema)
// };

const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticlesSchema = new Schema({
  title: String,
  postBody: String,
  author: String,
});

ArticlesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    postBody: this.postBody,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Articles = mongoose.model('Articles', ArticlesSchema);
module.exports = Articles;
module.exports = () => {
    return {
        connect: () => {
            const mongoose = require('mongoose');
            mongoose.connect('mongodb://localhost:27017/blogSite', { useNewUrlParser: true });
            mongoose.Promise = global.Promise;
            mongoose.set('debug', true);
            //Get the default connection
            const db = mongoose.connection;
            //bind the connection to an error event to get notifications of connection errors 
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            // return db;
        },
        createPostSchema: () => {
            const mongoose = require('mongoose');
            var articlesSchema = new mongoose.Schema({
                title: String,
                articleBody: String,
                author: String,
              });
            const Article = mongoose.model('Article', articlesSchema);
            return Article;
        }
    }
};
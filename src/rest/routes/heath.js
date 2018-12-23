module.exports = () => ({
    readiness: (req, res) => res.status(200).json({ ping: 'pong' }),
    liveness: (req, res) => {
                var monk = require('monk');
                var db = monk('localhost:27017/blogSite')

                var collection = db.get('posts');

                collection.find({}, {}, function (err, docs) {
                    res.status(200).json({ ping: docs })
                })
      
    }
  });
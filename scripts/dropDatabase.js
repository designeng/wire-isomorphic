var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/isomorphic_dev';

MongoClient.connect(url, function(err, db) {
    if(err) {
        console.log('ERROR:', err);
    } else {
        db.dropDatabase(function(err, res) {
            console.log('Dropped isomorphic_dev');
            process.exit();
        });

        db.createCollection('users', function(err, res) {
            console.log('created collection');
            process.exit();
        })
    }
});
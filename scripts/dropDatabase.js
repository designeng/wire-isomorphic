import when from 'when';
import pipeline from 'when/pipeline';

import { MongoClient } from 'mongodb';

let url = 'mongodb://localhost:27017/isomorphic_dev';
let Promise = when.promise;

const connectP = () => {
    return Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
            resolve(db);
        });
    });
}

const dropDatabaseP = (db) => {
    return Promise((resolve, reject) => {
        db.dropDatabase(function(err, res) {
            console.log('Dropped isomorphic_dev');
            resolve(db);
        });
    });
}

const run = () => {
    pipeline([connectP, dropDatabaseP]).then((res) => {
        process.exit();
    });
}

run();
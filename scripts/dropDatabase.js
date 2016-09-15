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

const createUsersCollectionP = (db) => {
    return Promise((resolve, reject) => {
        db.createCollection('users', function(err, collection) {
            console.log('Collection users created');
            resolve(collection);
        });
    });
}

const createAdminP = (collection) => {
    return Promise((resolve, reject) => {
        collection.insert({username: 'richard', password: '123'}, function(err, res) {
            console.log('Inserted user');
            resolve(res);
        });
    });
}

const run = () => {
    pipeline([connectP, dropDatabaseP, createUsersCollectionP, createAdminP]).then((res) => {
        console.log('RESULT:', res);
        process.exit();
    });
}

run();
import when from 'when';
import pipeline from 'when/pipeline';

import { MongoClient } from 'mongodb';

let Promise = when.promise;

const guestUserData = {
    username: 'guest',
    role: 'guest',
    password: null
}

const connectP = (url) => {
    return Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, db) {
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

const createGuestUserP = (collection) => {
    return Promise((resolve, reject) => {
        collection.insert(guestUserData, function(err, res) {
            console.log('Inserted user');
            resolve(res);
        });
    });
}

function createGuestUser(resolver, compDef, wire) {
    let database = compDef.options.database;

    let url = `mongodb://localhost:27017/${database}`;

    pipeline([connectP, createUsersCollectionP, createGuestUserP], url).then((res) => {
        resolver.resolve();
    });
}

export default function UserPlugin(options) {
    return {
        factories: {
            createGuestUser
        }
    }
}
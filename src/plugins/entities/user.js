import when from 'when';
import pipeline from 'when/pipeline';

import { MongoClient } from 'mongodb';
import { getAcl } from '../../lib/acl';

let Promise = when.promise;

const DEFAULT_ROLE = 'guest';

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
            resolve(collection);
        });
    });
}

const createGuestUserP = (collection) => {
    return Promise((resolve, reject) => {
        collection.insert(guestUserData, function(err, res) {
            resolve(res);
        });
    });
}

const addDefaultRoleToGuestUserP = (res) => {
    return Promise((resolve, reject) => {
        let acl = getAcl();
        acl.addUserRoles(guestUserData.username, DEFAULT_ROLE, (err, result) => {
            resolve(result);
        })
    });
}

function createGuestUser(resolver, compDef, wire) {
    let database = compDef.options.database;

    let url = `mongodb://localhost:27017/${database}`;

    pipeline([
            connectP,
            createUsersCollectionP,
            createGuestUserP,
            addDefaultRoleToGuestUserP
        ], url).then((res) => {
            resolver.resolve();
        }).catch((err) => {resolver.reject(err)});
}

export default function UserPlugin(options) {
    return {
        factories: {
            createGuestUser
        }
    }
}
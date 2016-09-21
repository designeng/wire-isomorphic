import { MongoClient } from 'mongodb';

function createUser(resolver, compDef, wire) {
    let database = compDef.options.database;
    let { username, password } = compDef.options.data;

    let url = `mongodb://localhost:27017/${database}`;

    MongoClient.connect(url, function (err, db) {
        resolver.resolve(db);
    });
}

export default function UserPlugin(options) {
    return {
        factories: {
            createUser
        }
    }
}
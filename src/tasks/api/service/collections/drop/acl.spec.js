import _ from 'underscore';
import mongoose from 'mongoose';

export default {
    $plugins: [
    ],

    dropAclCollections: {
        create: {
            module: () => {
                let mongoClient = require('mongodb').MongoClient;
                var url = 'mongodb://localhost:27017/isomorphic_dev';

                mongoClient.connect(url, function (err, db) {

                    if(err) {
                        return console.log('ERROR:::', err);
                    }

                });
            }
        }
    },

    response: {
        create: {
            module: (result) => {
                return JSON.stringify({res: 'dropped'});
            },
            args: [
                {$ref: 'dropAclCollections'},
            ]
        }
    },
}
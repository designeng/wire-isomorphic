var acl = require('acl');

import mongoose from 'mongoose';
import mongoExpress from 'mongo-express/lib/middleware';

function mongoUIMiddlewareFacet(resolver, facet, wire) {
    var target = facet.target;
    const route = facet.options.route;
    const config = facet.options.config;
    target.use(route, mongoExpress(config));
    resolver.resolve(target);
}

function connect () {
    let db = 'mongodb://localhost:27017/isomorphic_dev';
    let options = { server: { socketOptions: { keepAlive: 1 }}};
    return mongoose.connect(db, options).connection;
}

function connectToDatabase(resolver, facet, wire) {
    let target = facet.target;
    let connection = connect()
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', () => {
            let dbInstance = mongoose.connection;
            var mongoBackend = new acl.mongodbBackend(dbInstance, 'acl_');

            console.log('mongoBackend', mongoBackend);

            // acl.allow('guest', 'blogs', 'view');
            // acl.allow('member', 'blogs', ['edit','view', 'delete']);
            // acl.addUserRoles('dick', 'guest');

            // acl.isAllowed('dick', 'blogs', 'view', (err, res) => {
            //     console.log('------------------');
            //     if(res){
            //         console.log("User dick is allowed to view blogs")
            //     } else if(err) {
            //         console.log('ERROR ACL:::::', err);
            //     } else {
            //         console.log('no err, result!');
            //     }
            // });

            // acl.whatResources('member', (err, res) => {
            //     console.log('whatResources', err, res);
            // })

            return resolver.resolve(target);
        });
}

function addAccessControlSupportFacet(resolver, facet, wire) {
    let target = facet.target;
    let dbInstance = mongoose.connection;
    // let prefix = 'acl'
    // acl = new acl(new acl.mongodbBackend(dbInstance, prefix));

    // acl.allow('guest', 'blogs', 'view');
    // acl.allow('member', 'blogs', ['edit','view', 'delete']);
    // acl.addUserRoles('dick', 'guest');

    // acl.isAllowed('dick', 'blogs', 'view', (err, res) => {
    //     console.log('------------------');
    //     if(res){
    //         console.log("User dick is allowed to view blogs")
    //     } else if(err) {
    //         console.log('ERROR ACL:::::', err);
    //     } else {
    //         console.log('no err, result!');
    //     }
    // });

    // acl.whatResources('member', (err, res) => {
    //     console.log('whatResources', err, res);
    // })

    // console.log('acl:', acl);

    resolver.resolve(target);
}

export default function mongoExpressPlugin(options) {
    return {
        facets: {
            connectToDatabase: {
                'initialize:before': connectToDatabase
            },
            mongoUIMiddleware: {
                'create:after': mongoUIMiddlewareFacet
            },
            addAccessControlSupport: {
                'create:after': addAccessControlSupportFacet
            }
        }
    }
}
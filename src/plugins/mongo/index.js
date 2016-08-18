var Acl = require('acl');

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
            let connection = mongoose.connection;
            let db = connection.db;

            var acl = new Acl(new Acl.mongodbBackend(db));

            acl.allow('admin', ['blogs','forums'], '*')
            acl.allow('member', 'blogs', ['edit','view', 'delete']);

            acl.allow([
                {
                    roles:['guest','member'],
                    allows:[
                        {resources:'blogs', permissions:'get'},
                        {resources:['forums','news'], permissions:['get','put','delete']}
                    ]
                },
                {
                    roles:['gold','silver'],
                    allows:[
                        {resources:'cash', permissions:['sell','exchange']},
                        {resources:['account','deposit'], permissions:['put','delete']}
                    ]
                }
            ]);

            acl.allowedPermissions('james', ['blogs','forums'], function(err, permissions){
                console.log('james permissions: ', permissions)
            });

            acl.isAllowed('joed', 'blogs', 'view', function(err, res){
                if(res){
                    console.log("User joed is allowed to view blogs")
                } else {
                    console.log("User joed is not allowed to view blogs")
                }
            });

            acl.whatResources('member', function(err, resourses){
                console.log('member resourses: ', resourses)
            });

            return resolver.resolve(target);
        });
}

function addAccessControlSupportFacet(resolver, facet, wire) {
    let target = facet.target;
    // TODO: see connectToDatabase

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
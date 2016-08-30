var Acl = require('acl');

import mongoose from 'mongoose';
import mongoExpress from 'mongo-express/lib/middleware';

let connection = null;

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
    connection = connect()
        .on('error', console.log);
}

function addPermissions(resolver, facet, wire) {
    let target = facet.target;
    const permissions = facet.options.permissions;
    connection.once('open', () => {
            var acl = new Acl(new Acl.mongodbBackend(mongoose.connection.db));
            acl.allow(permissions);

            acl.allowedPermissions('joed', ['blogs', 'forums'], function(err, permissions){
                console.log('joed permissions: ', permissions)
            });
            
            acl.addUserRoles('joed', ['member']);

            acl.isAllowed('joed', 'blogs', 'takeALook', function(err, res){
                if(res){
                    console.log("User joed is allowed to view blogs")
                } else {
                    console.log("User joed is not allowed to view blogs")
                }
            });

            // acl.whatResources('member', function(err, resourses){
            //     console.log('member resourses: ', resourses)
            // });

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
            addPermissions: {
                'initialize:before': addPermissions
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
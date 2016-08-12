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
            return resolver.resolve(target);
        });
}

export default function mongoExpressPlugin(options) {
    return {
        facets: {
            connectToDatabase: {
                'initialize:before': connectToDatabase
            },
            mongoUIMiddleware: {
                'create:after': mongoUIMiddlewareFacet
            }
        }
    }
}
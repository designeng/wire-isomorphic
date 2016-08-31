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

function addAccessControlSupportFacet(resolver, facet, wire) {
    let target = facet.target;
    // TODO: see connectToDatabase

    resolver.resolve(target);
}

export default function mongoExpressPlugin(options) {
    return {
        facets: {
            mongoUIMiddleware: {
                'create:after': mongoUIMiddlewareFacet
            },
            addAccessControlSupport: {
                'create:after': addAccessControlSupportFacet
            }
        }
    }
}
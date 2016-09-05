import mongoose from 'mongoose';
import mongoExpress from 'mongo-express/lib/middleware';

function mongoUIMiddlewareFacet(resolver, facet, wire) {
    var target = facet.target;
    const route = facet.options.route;
    const config = facet.options.config;
    target.use(route, mongoExpress(config));
    resolver.resolve(target);
}

export default function mongoExpressPlugin(options) {
    return {
        facets: {
            mongoUIMiddleware: {
                'create:after': mongoUIMiddlewareFacet
            },
        }
    }
}
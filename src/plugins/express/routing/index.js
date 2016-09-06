import _ from 'underscore';

import showNotFoundPage from '../../../lib/express/showNotFoundPage';
import getPathName from '../../../lib/express/getPathName';

import useRoutes from '../../../lib/express/useRoutes';

function routeMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;

    useRoutes(target, routes);

    resolver.resolve(target);
}

export default function routeMiddlewarePlugin(options) {
    return {
        facets: {
            routeMiddleware: {
                'initialize:before': routeMiddleware
            }
        }
    }
}
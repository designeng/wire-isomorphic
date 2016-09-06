import _ from 'underscore';

import showNotFoundPage from '../../../utils/express/showNotFoundPage';
import getPathName from '../../../utils/express/getPathName';

import useRoutes from '../../../utils/express/useRoutes';

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
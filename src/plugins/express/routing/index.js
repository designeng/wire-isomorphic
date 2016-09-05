import fs from 'fs';
import _ from 'underscore';
import url from 'url';
import pipeline from 'when/pipeline';

import createContext from '../../../utils/createContext';
import createUniqueId from '../../../utils/createUniqueId';

import createRouteTasksHandler from '../../../utils/express/createRouteTasksHandler';
import registerRoutePlugins from '../../../utils/wire/registerRoutePlugins';

import showNotFoundPage from '../../../utils/express/showNotFoundPage';
import getPathName from '../../../utils/express/getPathName';

function routeMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;
    const specs = facet.options.specs;
    const specSource = facet.options.specSource;

    const before = facet.options.before || function before(request, response, next) { next() };
    const after = facet.options.after || function after(request, response, next) { next() };

    routes.forEach(route => {
        if(!route._id) {
            createUniqueId(route, 'route_');
        }

        registerRoutePlugins(route, specs);

        target[route.method || 'get'](route.url, before, createRouteTasksHandler(route, specs, specSource), after);

        resolver.resolve(target);
    });
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
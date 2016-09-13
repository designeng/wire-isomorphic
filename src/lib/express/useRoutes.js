import registerRoutePlugins from '../wire/registerRoutePlugins';
import createRouteTasksHandler from './createRouteTasksHandler';
import createRouteCRUDHandler from './createRouteCRUDHandler';
import createUniqueId from '../createUniqueId';
import specs from '../../specs';
import _ from 'underscore';

export default function useRoutes({target, routes, baseUrl, module}) {
    routes.forEach(route => {
        if(typeof route._id === 'undefined') {
            createUniqueId(route, 'route_');
        }

        if(_.isFunction(route.handler)) {
            console.log('route.method:::', route.method);
            return target[route.method || 'get'](route.url, route.handler(route));
        }

        if(route.type == 'CRUD' && typeof module !== 'undefined') {
            createRouteCRUDHandler(route.url, baseUrl, module);
        } else {
            registerRoutePlugins(route, specs);
            target[route.method || 'get'](route.url, createRouteTasksHandler(route, specs, specs._specSource));
        }
    });
}
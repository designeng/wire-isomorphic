import registerRoutePlugins from '../wire/registerRoutePlugins';
import createRouteTasksHandler from './createRouteTasksHandler';
import createUniqueId from '../createUniqueId';
import specs from '../../specs';

export default function useRoutes(target, routes) {
    routes.forEach(route => {
        if(!route._id) {
            createUniqueId(route, 'route_');
        }

        registerRoutePlugins(route, specs);

        target[route.method || 'get'](route.url, createRouteTasksHandler(route, specs, specs._specSource));
    });
}
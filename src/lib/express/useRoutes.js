import registerRoutePlugins from '../wire/registerRoutePlugins';
import createRouteTasksHandler from './createRouteTasksHandler';
import createRouteCRUDHandler from './createRouteCRUDHandler';
import createUniqueId from '../createUniqueId';
import specs from '../../specs';

export default function useRoutes({target, routes, baseUrl, module}) {
    routes.forEach(route => {
        if(!route._id) {
            createUniqueId(route, 'route_');
        }

        if(route.type == 'CRUD') {
            createRouteCRUDHandler(route.url, baseUrl, module);
        } else {
            registerRoutePlugins(route, specs);
            target[route.method || 'get'](route.url, createRouteTasksHandler(route, specs, specs._specSource));
        }
    });
}
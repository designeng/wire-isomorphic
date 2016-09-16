import registerRoutePlugins from '../wire/registerRoutePlugins';
import createRouteTasksHandler from './createRouteTasksHandler';
import createRouteCRUDHandler from './createRouteCRUDHandler';
import createUniqueId from '../createUniqueId';
import specs from '../../specs';

export default function useRoutesStrategies({target, routes, baseUrl, module}) {
    routes.forEach(route => {
        if(typeof route._id === 'undefined') {
            createUniqueId(route, 'route_');
        }

        let method = route.method ? route.method.toLowerCase() : 'get';

        if(_.isFunction(route.handler)) {
            return target[method](route.url, route.handler(target, route));
        }

        if(route.type == 'CRUD' && typeof module !== 'undefined') {
            createRouteCRUDHandler(target, route.url, baseUrl, module);
        } else {
            registerRoutePlugins(route, specs);
            target[method](route.url, createRouteTasksHandler(route, specs, specs._specSource));
        }
    });
}
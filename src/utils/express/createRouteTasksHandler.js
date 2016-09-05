import _ from 'underscore';
import url from 'url';
import createContext from '../createContext';
import { createSuffixSpecifications } from '../wire/registerRoutePlugins';

import webpackSpec from '../../tasks/webpack/spec';

export default function createRouteTasksHandler(route, specs, specSource) {
    return (request, response, next) => {
        let tasks = _.map(route.tasks, (name) => {
            return specs[name];
        });

        let routeUrl = route.url;
        let provide = route.provide;
        let success = route.success;
        let error = route.error;

        let requestUrl = request.url;
        const requestUrlArr = requestUrl.split('/');

        // remove zero blank element
        requestUrlArr.shift();

        let environment = {
            compiledScript: null,
            routeId: route._id || null,
        };

        _.extend(environment, {
            routeUrl: routeUrl,
            requestUrl: requestUrl,
            hostname: request.hostname,
            headers: route.headers || null,
            requestHeaders: request.headers,
        });
            
        if(route.environment) _.extend(environment, _.isFunction(route.environment) ? route.environment(requestUrl) : route.environment);

        if(request.params) {
            // common case
            _.extend(environment, request.params);
        }

        if(provide) {
            _.extend(environment, provide);
        }

        const { query } = url.parse(requestUrl, true);

        // To prevent queries like '/?wire=[module-name]' (throws the error 'Cannot find module [module-name]')
        if(query.wire) {
            delete query.wire;
        }
            
        const parsedRequestUrl = url.parse(requestUrl, false);

        if(query) {
            _.extend(environment, { query });
        }

        if(request.cookies) {
            _.extend(environment, { cookies: request.cookies });
        }

        if(route.method === 'post' && request.body) {
            _.extend(environment, { requestPostObject: request.body });
        }

        // TODO: make it more clear
        if(route.webpack) {
            _.extend(environment, { specToCompile: _.map(route.webpack, (specName) => {
                return {
                        name: specName,
                        path: _.find(specSource, {name: specName})['path']
                    }
                }) 
            });
        }

        let prefixSpecifications = [environment];

        if(route.webpack) {
            // TODO: bad design: utils function depends on outer task spec.....
            prefixSpecifications.push(webpackSpec);
        }

        let suffixSpecifications = createSuffixSpecifications(route);

        let contextSpecs = _.union(prefixSpecifications, tasks, suffixSpecifications);

        if(route.access) {
            createContext(_.union(prefixSpecifications, route.access)).then((context) => {
                if(context.access === true) {
                    createContext(contextSpecs).then(success(request, response), error(request, response));
                } else {
                    response.status(401).end('You are not authorized to access this page.');
                }
            });
        } else {
            createContext(contextSpecs).then(success(request, response), error(request, response));
        }
    }

}
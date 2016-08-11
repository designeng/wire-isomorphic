import fs from 'fs';
import _ from 'underscore';
import url from 'url';
import pipeline from 'when/pipeline';

import createContext from '../../../utils/createContext';
import showNotFoundPage from '../../../utils/express/showNotFoundPage';
import shouldBeSkipped from '../../../utils/express/shouldBeSkipped';
import getPathName from '../../../utils/express/getPathName';

import webpackSpec from '../../../tasks/webpack/spec';

import pluck from '../../../utils/pluck';

let registeredUrlPlugins = {};

function registerRoutePlugins(url, routeSpecs, specs) {
    registeredUrlPlugins[url] || (registeredUrlPlugins[url] = {
        plugins: [],
        names: {}
    });

    _.each(routeSpecs, (spec) => {
        _.each(specs[spec].$plugins, (plugin) => {
            registeredUrlPlugins[url].names[plugin.name] || (registeredUrlPlugins[url].names[plugin.name] = 1 && registeredUrlPlugins[url].plugins.push(plugin));
        });
    });
}

function createSuffixSpecifications(url) {
    return [{$plugins: registeredUrlPlugins[url].plugins}];
}

function routeMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;
    const specs = facet.options.specs;
    const specSource = facet.options.specSource;

    const skip = facet.options.skip;
    const before = facet.options.before || function before(request, response, next) { next() };
    const after = facet.options.after || function after(request, response, next) { next() };

    routes.forEach(route => {
        let method = route.method || 'get';

        registerRoutePlugins(route.url, route.routeSpec, specs);

        target[method](route.url, before, (request, response, next) => {
            let routeSpec = _.map(route.routeSpec, (name) => {
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

            if(shouldBeSkipped(getPathName(request), skip)) {
                return next();
            }

            let environment = {
                compiledScript: null,
                routeId: route.routeId || null,
            };

            _.extend(environment, {
                routeUrl: routeUrl,
                requestUrl: requestUrl,
                hostname: request.hostname,
                redirect: response.redirect,
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
                }) });
            }

            let prefixSpecifications = [environment];

            if(route.webpack) {
                prefixSpecifications.push(webpackSpec);
            }

            let suffixSpecifications = createSuffixSpecifications(route.url);

            let contextSpecs = _.union(prefixSpecifications, routeSpec, suffixSpecifications);

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

        }, after);

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
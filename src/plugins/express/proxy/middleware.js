import _ from 'underscore';

import axios from 'axios';

import normalizeCookies from '../../../utils/express/headers/cookie/normalizeCookies';
import prepareData from '../../../utils/prepareData';

function proxyMiddleware(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;
    const originApiHost = facet.options.originApiHost;

    routes.forEach(route => {
        let method = route.method.toLowerCase() || 'get';

        target[method](route.url, function (request, response) {

            // TODO: HACKS. Move backend to node.js!
            // only for company form feedback!
            if(request.body.companyname && request.body.company) {
                route.originUrl = '/api/v1/feedback';
            }
            // for thread form
            if(request.body.forum) {
                route.originUrl = '/api/v1/forum/thread';
            }

            // for configuration comparison page
            if (request.url.match(/\/compare\?/) && request.query.id && request.query.id.length && !request.query.ids) {
                request.query.ids = request.query.id.join(',');
            }

            if(route.url.match(/^\/edit.php/)) {
                request.body['node_js_request'] = true;
            }
            // /TODO: HACKS

            let query = request.query;
            let headers = route.headers || {};
            let forwardCookies = route.forwardCookies;
                    
            if(forwardCookies) {
                // _.extend(headers, {'Cookie': request.get('Cookie')});
                let normalizedCookies = normalizeCookies(request.cookies);
                _.extend(headers, {'Cookie': normalizedCookies});
            }

            let data = prepareData(request.body);

            let outputFormat = route.outputFormat;

            let config = {
                method: method,
                url: originApiHost + route.originUrl,
                data,
                params: query,
                headers
            };

            if(outputFormat == 'jpeg') {
                _.extend(config, {responseType: 'arraybuffer'});
            }

            let defaultCallback = function(result) {
                let output,
                    encoding = null;

                if(outputFormat == 'html') {
                    _.extend(headers, {'Content-Type': 'text/html; charset=utf-8'});
                    output = result.data;
                } else if(outputFormat == 'plain') {
                    _.extend(headers, {'Content-Type': 'text/plain'});
                    output = result.data;
                } else if(outputFormat == 'jpeg') {
                    _.extend(headers, {'Content-Type': 'image/jpeg'});
                    output = result.data;
                    encoding = 'binary';
                } else if(outputFormat == 'xml') {
                    _.extend(headers, {'Content-Type': 'application/xml'});
                    output = result.data;
                } else if(outputFormat == 'json' || !outputFormat) { //default
                    _.extend(headers, {'Content-Type': 'application/json'});
                    output = JSON.stringify(result.data);
                }

                response.writeHead(200, headers);
                response.end(output, encoding);
            }

            let axiosResponseCallback = route.callback ? route.callback(request, response) : defaultCallback;

            axios(config)
            .then(axiosResponseCallback)
            .catch(error => {
                response.setHeader('charset', 'utf-8');
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(error));
            });
        });
    });

    resolver.resolve(target);
}

export default function proxyMiddlewarePlugin(options) {
    return {
        facets: {
            proxyMiddleware: {
                'initialize:before': proxyMiddleware
            }
        }
    }
}
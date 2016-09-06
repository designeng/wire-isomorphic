import axios from 'axios';
import _ from 'underscore';
import chalk from 'chalk';

import normalizeCookies from '../../lib/express/headers/cookie/normalizeCookies';
import prepareData from '../../lib/prepareData';

function getEndpointRepresentedByArray(array) {
    return _.reduce(array, (result, item) => {
        if(_.isString(item)) {
            return result.length > 0 ? result + '/' + item : result + item;
        } else if(_.isObject(item)) {
            let query = '';

            for(let key in item) {
                query += key + '=' + item[key] + '&';
            }

            let delimiter = result.match(/\?/) ? '&' : '?';

            return result += delimiter + query;
        }
    }, '');
}

function normalizeEndpoint(endpoint) {
    return _.isString(endpoint) ? endpoint : (_.isArray(endpoint) ?
        getEndpointRepresentedByArray(endpoint)
        : new Error('[requestPlugin:] Endpoint should be a string or array.'))
}

function request(resolver, compDef, wire) {

    wire(compDef.options).then(({
        endpoint,
        what,
        params,
        cookies,
        body
    }) => {
        let data = null;

        body = body || request.body;

        if (!endpoint) {
            throw new Error('[requestPlugin:] Please set endpoint to request factory.')
        }
        let method = compDef.options.method;
        const allowedMethods = ['get', 'delete', 'head', 'post', 'put', 'patch'];

        if(!method) {
            method = 'get'
        } else if(allowedMethods.indexOf(method) == -1) {
            throw new Error('[requestPlugin:] Unknown method!');
        }

        let headers = {};
        if(cookies) {
            let normalizedCookies = normalizeCookies(cookies);
            _.extend(headers, {'Cookie': normalizedCookies});
        }

        if(method === 'post' && body) {
            data = prepareData(body);
        }

        endpoint = normalizeEndpoint(endpoint);

        // console.log(endpoint);
        
        let config = {
            method: method,
            url: endpoint,
            data,
            params,
            headers
        };

        axios(config)
        .then(response => {
            let result = what ? response.data[what] : response.data;
            resolver.resolve(result);
        })
        .catch(error => {
            resolver.reject(error);
        });
    });
}

export default function requestPlugin(options) {
    return {
        factories: {
            request
        }
    }
}
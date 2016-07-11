import _ from 'underscore';

const PROTOCOL = process.env.PROTOCOL;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const config = {
    protocol: 'http',
    host: 'localhost',
    baseDir: 'api',
    version: 'v1'
}

const endpoints = {
    brands: '/brands',
    cities: '/cities',
}

function getBaseUrl(options) {
    if(options && options.mode == 'raw') {
        return config.protocol + '://' + config.host;
    }

    return config.protocol + '://' + config.host + '/' + config.baseDir + '/' + config.version
}

export default config;

export function getEndpoint(item, replacement, options) {
    let fragmentRegex = /{(.*?)}/g;
    let endpoint = endpoints[item];

    if(!endpoint) {
        throw new Error('No such endpoint: ' + item);
    }

    if(replacement) {
        let matches = endpoint.match(fragmentRegex);
        if(matches) {
            endpoint = _.reduce(matches, (result, item) => {
                let replaceWith = replacement[item.slice(1).slice(0, -1)];
                result = replaceWith ? result.replace(item, replaceWith) : result.replace(item, '');
                return result;
            }, endpoint);
        }
    }

    // TODO: test it
    // remove extra slashes from endpoint
    endpoint = endpoint.replace(/(\/{2})/g, '/');

    endpoint = getBaseUrl(options) + endpoint;

    return endpoint;
}

export function getLocalEndpoint(url) {
    return `${PROTOCOL}://${HOST}:${PORT}${url}`;
}
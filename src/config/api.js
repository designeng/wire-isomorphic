const PROTOCOL = process.env.PROTOCOL;
const HOST = process.env.HOST;
const PORT = process.env.PORT;

const config = {
    protocol: 'http',
    host: 'localhost',
    baseDir: 'api',
    version: 'v1'
}

export function getBaseUrl() {
    return config.protocol + '://' + config.host + '/' + config.baseDir + '/' + config.version
}

export function getLocalEndpoint(url) {
    return `${PROTOCOL}://${HOST}:${PORT}${url}`;
}

export default config;
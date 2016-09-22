import _ from 'underscore';
let env = process.env.ENVIRONMENT;

export function client(target, key, descriptor) {
    if (env === 'server') {
        target[key] = null;
        return target
    }
}

export function server(target, key, descriptor) {
    if (env === 'server') {
        // nothing interesting here
    }
}
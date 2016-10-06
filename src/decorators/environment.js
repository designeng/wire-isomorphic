import _ from 'underscore';
let env = process.env.ENVIRONMENT;

export function client(target, key, descriptor, options) {
    if (env === 'server') {
        target[key] = null;
        return target
    }
}

export function server({ otherwise }) {
    return (target, key, descriptor) => {
        if (env !== 'server') {
            if(otherwise) {
                target[key] = otherwise;
            } else {
                target[key] = null;
            }
            return target;
        }
    }
}
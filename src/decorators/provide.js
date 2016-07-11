import _ from 'underscore';
import providePlugin from '../plugins/api/provide';

export default function provide(config) {
    if(!config) {
        throw new Error('[decorators/provide:] Set up valid config!')
    }
    return (target, name, description) => {
        _.isArray(target.$plugins) ? void 0 : target.$plugins = [];
        target.$plugins.push(providePlugin);

        return {
            value: {
                provide: {
                    endpoint: config.endpoint,
                    what: config.what
                }
            }
        }
    }
}
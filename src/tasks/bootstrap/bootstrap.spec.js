// import wireDebugPlugin from 'essential-wire/source/debug';

import _ from 'underscore';
import requestPlugin from '../../plugins/api/request';

import { getEndpoint, getLocalEndpoint } from '../../config/api';
import getCarcassFn from './getCarcassFn';

import splitToTokens from '../../utils/express/splitToTokens';

export default {
    $plugins: [
        // {module: debugPlugin, verbose: true},
        requestPlugin,
    ],

    brandsData: {
        request: {
            endpoint: getLocalEndpoint('/api/v1/brands'),
        }
    },

    citiesData: {
        request: {
            endpoint: getLocalEndpoint('/api/v1/cities'),
        }
    },

    getCarcassFn: {
        create: {
            module: getCarcassFn,
            args: [
                {$ref: 'brandsData'},
                {$ref: 'citiesData'},
                {$ref: 'requestUrl'},
            ]
        }
    }
}
// import wireDebugPlugin from 'essential-wire/source/debug';

import _ from 'underscore';
import requestPlugin from '../../plugins/api/request';

import { getEndpoint } from '../../config/api';
import getCarcassFn from './getCarcassFn';

import splitToTokens from '../../utils/express/splitToTokens';

export default {
    $plugins: [
        // {module: debugPlugin, verbose: true},
        requestPlugin,
    ],

    brandsData: {
        request: {
            endpoint: getEndpoint('brands'),
        }
    },

    citiesData: {
        request: {
            endpoint: getEndpoint('cities'),
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
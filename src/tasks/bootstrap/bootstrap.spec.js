// import wireDebugPlugin from 'essential-wire/source/debug';

import _ from 'underscore';
import requestPlugin from '../../plugins/api/request';
import createComponentPlugin from '../../plugins/component';

import { getEndpoint, getLocalEndpoint } from '../../config/api';
import getCarcassFn from './getCarcassFn';

import axisTpl from '../../templates/build/axisTpl';
import axisCellTpl from '../../templates/build/axisCellTpl';

export default {
    $plugins: [
        requestPlugin,
        createComponentPlugin,
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

    axisCellData: {
        backgroundColor: '#CC9966'
    },

    axisCell: {
        createComponent: {
            template: axisCellTpl,
            datasource: axisCellData,
            partials: [
                {$ref: 'axisCell'}
            ]
        },
    },

    axisX: {
        createComponent: {
            template: axisTpl,
            datasource: brandsData,
            partials: [
                {$ref: 'axisCell'}
            ]
        },
    },

    axisY: {
        createComponent: {
            template: axisTpl,
            datasource: citiesData,
            partials: [
                {$ref: 'axisCell'}
            ]
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
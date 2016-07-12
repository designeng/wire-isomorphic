// import wireDebugPlugin from 'essential-wire/source/debug';

import _ from 'underscore';
import requestPlugin from '../../plugins/api/request';
import createComponentPlugin from '../../plugins/component';

import { getEndpoint, getLocalEndpoint } from '../../config/api';

import carcassTpl from '../../templates/build/carcassTpl';
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
            datasource: {$ref: 'axisCellData'}
        },
    },

    axisX: {
        createComponent: {
            template: axisTpl,
            datasource: {$ref: 'brandsData'},
            partials: [
                {AxisCell: {$ref: 'axisCell'}}
            ]
        },
    },

    axisY: {
        createComponent: {
            template: axisTpl,
            datasource: {$ref: 'citiesData'},
            partials: [
                {AxisCell: {$ref: 'axisCell'}}
            ]
        }
    },

    carcassData: {
        styleSheets: [
            {src: '/css/carcass.css'}
        ],
        bottomScripts: [
            {sync: true, src: '/js/main.js'}
        ]
    },

    carcass: {
        createComponent: {
            template: carcassTpl,
            datasource: {$ref: 'carcassData'},
            partials: [
                {AxisX: {$ref: 'axisX'}},
                {AxisY: {$ref: 'axisY'}},
            ]
        }
    },

    testRef: {
        create: {
            module: (brandsData, citiesData, axisX) => {
                console.log('brandsData, citiesData:::', brandsData, citiesData, axisX);
            },
            args: [
                {$ref: 'brandsData'},
                {$ref: 'citiesData'},
                {$ref: 'axisX'},
            ]
        }
    }
}
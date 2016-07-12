// import wireDebugPlugin from 'essential-wire/source/debug';

import _ from 'underscore';
import requestPlugin from '../../plugins/api/request';
import createComponentPlugin from '../../plugins/component';
import webpackCompilePlugin from '../../plugins/webpack'

import { getEndpoint, getLocalEndpoint } from '../../config/api';

import carcassTpl from '../../templates/build/carcassTpl';
import styleSheetsTpl from '../../templates/build/styleSheetsTpl';
import bottomScriptsTpl from '../../templates/build/bottomScriptsTpl';
import axisTpl from '../../templates/build/axisTpl';
import axisCellTpl from '../../templates/build/axisCellTpl';

export default {
    $plugins: [
        requestPlugin,
        createComponentPlugin,
        webpackCompilePlugin
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
            tags: [
                {AxisCell: {$ref: 'axisCell'}}
            ]
        },
    },

    axisY: {
        createComponent: {
            template: axisTpl,
            datasource: {$ref: 'citiesData'},
            tags: [
                {AxisCell: {$ref: 'axisCell'}}
            ]
        }
    },

    styleSheetsData: {
        items: [
            {path: '/css/carcass.css'}
        ]
    },

    styleSheets: {
        createComponent: {
            template: styleSheetsTpl,
            datasource: {$ref: 'styleSheetsData'},
        }
    },

    bottomScriptsData: {
        items: [
            {sync: true, src: '/js/main.js'},
            {sync: true, src: {$ref: 'compiledScript'}}
        ],
    },

    bottomScripts: {
        createComponent: {
            template: bottomScriptsTpl,
            datasource: {$ref: 'bottomScriptsData'},
        }
    },

    carcass: {
        createComponent: {
            template: carcassTpl,
            tags: [
                {StyleSheets: {$ref: 'styleSheets'}},
                {AxisX: {$ref: 'axisX'}},
                {AxisY: {$ref: 'axisY'}},
                {PageContent: {$ref: 'pageContent'}},
                {BottomScripts: {$ref: 'bottomScripts'}},
            ]
        }
    }
}
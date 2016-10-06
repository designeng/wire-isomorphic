// import wireDebugPlugin from 'essential-wire/source/debug';

import snabbdomComponentPlugin from '../../plugins/component/snabbdom';
import composeComponentPlugin from '../../plugins/component/compose';
import webpackCompilePlugin from '../../plugins/webpack';
import snabbdomBottomScriptsTpl from '../../templates/snabbdomBottomScriptsTpl';

import carcassTpl from '../../templates/build/carcassTpl';

export default {
    $plugins: [
        snabbdomComponentPlugin,
        composeComponentPlugin,
        webpackCompilePlugin
    ],

    bottomScriptsData: {
        items: [
            {async: true, src: {$ref: 'compiledScript'}}
        ],
    },

    bottomScripts: {
        createComponent: {
            template: snabbdomBottomScriptsTpl,
            datasource: {$ref: 'bottomScriptsData'},
        }
    },

    carcass: {
        composeComponent: {
            template: carcassTpl,
            tags: [
                {PageContent: {$ref: 'pageContent'}},
                {BottomScripts: {$ref: 'bottomScripts'}},
            ]
        }
    }
}
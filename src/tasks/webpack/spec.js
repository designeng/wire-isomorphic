import webpackCompilePlugin from '../../plugins/webpack';

export default {
    $plugins: [
        webpackCompilePlugin
    ],

    // compiledScript should be injected into page carcass in carcassSpec
    compiledScript: {
        webpackCompile: {
            specToCompile: {$ref: `specToCompile`},
            pageId: {$ref: `pageId`},
        }
    }
}
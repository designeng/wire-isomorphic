import webpackCompilePlugin from '../../plugins/webpack';

export default {
    $plugins: [
        webpackCompilePlugin
    ],

    compiledScript: {
        webpackCompile: {
            entry: {$ref: `entry`},
            pageId: {$ref: `pageId`},
        }
    },

    entry: {
        createEntry: {
            specToCompile: {$ref: `specToCompile`},
            pageId: {$ref: `pageId`},
        }
    }
}
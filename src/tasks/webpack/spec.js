import webpackCompilePlugin from '../../plugins/webpack';

export default {
    $plugins: [
        webpackCompilePlugin
    ],

    compiledScript: {
        webpackCompile: {
            entry: {$ref: `entry`},
            routeId: {$ref: `routeId`},
        }
    },

    entry: {
        createEntry: {
            specToCompile: {$ref: `specToCompile`},
            routeId: {$ref: `routeId`},
        }
    }
}
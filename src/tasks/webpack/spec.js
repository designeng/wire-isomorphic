import webpackCompilePlugin from '../../plugins/webpack';

export default {
    $plugins: [
        webpackCompilePlugin
    ],

    compiledScript: {
        webpackCompile: {
            specToCompile: {$ref: `specToCompile`},
            pageId: {$ref: `pageId`},
        }
    }
}
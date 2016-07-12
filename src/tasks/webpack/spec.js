import webpackCompilePlugin from '../../plugins/webpack';
import webpackConfig from '../../../webpack.config';

export default {
    $plugins: [
        webpackCompilePlugin
    ],

    // compiledScript should be injected into page carcass in carcassSpec
    compiledScript: {
        webpackCompile: {
            specToCompile: {$ref: `specToCompile`},
            pageId: {$ref: `pageId`},
            webpackConfig: webpackConfig,
        }
    }
}
import webpackCompilePlugin from '../../plugins/webpack';
import webpackConfig from '../../../webpack.config';

export default {
    $plugins: [
        webpackCompilePlugin
    ],

    // TODO: here should be a relative path to compiled script
    compiledScript: {
        webpackCompile: {
            specToCompile: {$ref: `specToCompile`},
            webpackConfig: webpackConfig,
        }
    }
}
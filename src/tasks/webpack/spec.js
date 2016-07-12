import webpackCompilePlugin from '../../plugins/webpack'

export default {
    $plugins: [
        webpackCompilePlugin
    ],

    compiledScript: {
        webpackCompile: {
            routeSpec: {$ref: `routeSpec`}
        }
    }
}
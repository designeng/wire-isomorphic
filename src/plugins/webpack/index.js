import webpack from 'webpack';
import mainJsTpl from '../../templates/build/js/client/main';

function webpackCompile(resolver, compDef, wire) {
    const webpackConfig = compDef.options.webpackConfig;

    let options = {
        pageId: compDef.options.pageId,
        specToCompile: compDef.options.specToCompile,
    }

    wire(options).then(({
        specToCompile,
        pageId
    }) => {

        const compiler = webpack(webpackConfig);
        compiler.run(function(err, stats) {
            if(err) {
                resolver.reject(err);
            } else {
                // TODO: here should be a relative path to compiled script
                // resolver.resolve(.......);
                
                let mainContent = mainJsTpl({
                    specs: specToCompile,
                    pageId: pageId
                });

                console.log(mainContent);

                // noop:
                resolver.resolve('/js/webpack_compiled_script.js');
            }
        });
    });
}

export default function webpackCompilePlugin(options) {
    return {
        factories: {
            webpackCompile
        }
    }
}
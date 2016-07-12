import webpack from 'webpack';
import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';

import mainJsTpl from '../../templates/build/js/client/main';

let webpackConfig = {
    context: __dirname + '/../../src',
    entry: {
        main: []
    },
    output: {
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    node: {
        fs: "empty" // avoids error messages
    }
}

function webpackCompile(resolver, compDef, wire) {
    // const webpackConfig = compDef.options.webpackConfig;

    let options = {
        pageId: compDef.options.pageId,
        specToCompile: compDef.options.specToCompile,
    }

    wire(options).then(({
        specToCompile,
        pageId
    }) => {
        let outputPath = `/webpack/build/${pageId}`;
        webpackConfig.output.path = path.join(__dirname, `/../../../public/${outputPath}`);
        webpackConfig.output.filename = `index.js`;

        let tempPath = path.join(__dirname, `/../../../temp/${pageId}/index.js`);
        webpackConfig.entry[pageId] = [];
        webpackConfig.entry[pageId].push(tempPath);

        let fileContent = mainJsTpl({
            specs: specToCompile,
            pageId: pageId
        });

        // TODO: make plugins for this
        mkdirp(`${outputPath}`, (err) => { 
            fs.writeFile(`${tempPath}`, fileContent, (error) => {
                if (error) {
                    console.log('ERROR:::', error);
                } else {
                    const compiler = webpack(webpackConfig);
                    compiler.run(function(err, stats) {
                        if(err) {
                            resolver.reject(err);
                        } else {
                            // TODO: fix it! here should be a relative path to compiled script
                            // resolver.resolve(`${outputPath}/index.js`);
                            resolver.resolve(`/js/webpack_compiled_script.js`);
                        }
                    });
                }
            });
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
import _ from 'underscore';
import webpack from 'webpack';
import path from 'path';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import fs from 'fs';

// TODO: 
// does not work:
import mainJsTpl from '../../templates/build/js/client/main';
// 
// simple script works:
// import mainJsTpl from '../../templates/build/js/client/main_simple';

let config = {
    // TODO:
    // context: __dirname + '/../../../temp',
    entry: {
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

function createEntry(resolver, compDef, wire) {
    wire(compDef.options).then(({
        specToCompile,
        routeId
    }) => {
        let tempFolder = path.join(__dirname, `/../../../temp/${routeId}`);
        let outputPath = `/webpack/build/${routeId}`;

        let fileContent = mainJsTpl({
            specs: specToCompile,
            routeId: routeId
        });

        console.log('fileContent:::', fileContent);

        mkdirp(`${tempFolder}`, (err) => {
            let tempEntryPath = `${tempFolder}/index.js`;
            fs.writeFile(tempEntryPath, fileContent, (error) => {
                if (error) {
                    console.log('ERROR:::', error);
                } else {
                    resolver.resolve(tempEntryPath);
                }
            });
        });
    });
}

function webpackCompile(resolver, compDef, wire) {
    // const webpackConfig = compDef.options.webpackConfig
    let webpackConfig = _.clone(config);
    wire(compDef.options).then(({
        entry,
        routeId
    }) => {
        let outputPath = `/webpack/build/${routeId}`;
        webpackConfig.output.path = path.join(__dirname, `/../../../public/${outputPath}`);
        webpackConfig.output.filename = `index.js`;

        webpackConfig.entry[routeId] = [];
        webpackConfig.entry[routeId].push(entry);

        // TODO: rimraf temp folder
        // TODO: cache compiled scripts for routeId.

        const compiler = webpack(webpackConfig);
        compiler.run(function(err, stats) {
            if(err) {
                resolver.reject(err);
            } else {
                // relative path to compiled script
                resolver.resolve(`${outputPath}/index.js`);
            }
        });
    });
}

export default function webpackCompilePlugin(options) {
    return {
        factories: {
            createEntry,
            webpackCompile,
        }
    }
}
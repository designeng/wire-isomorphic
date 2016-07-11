import fs from 'fs';

function staticAssets(resolver, facet, wire) {
    const target = facet.target;
    const routes = facet.options.routes;

    let cache = {};

    routes.forEach(route => {
        target.get(route.url, function (req, res) {
            const path = route.path;
            res.writeHead(200, { 'Content-Type': 'text/plain' });

            if(!cache[path]) {
                fs.readFile(path, 'utf8', function (error, content) {
                    if (error) {
                        return console.log(error);
                    }
                    cache[path] = content;
                    res.end(content);
                });
            } else {
                res.end(cache[path]);
            }
        });
    });

    resolver.resolve(target);
}

export default function staticAssetsPlugin(options) {
    return {
        facets: {
            staticAssets: {
                'initialize:before': staticAssets
            }
        }
    }
}
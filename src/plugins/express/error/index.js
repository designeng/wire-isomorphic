function errorMiddleware(resolver, facet, wire) {
    const target = facet.target;

    target.use(function(err, req, res, next) {
        // TODO
        // handle error, for example
        // showErrorPage(error, req, res)
    });

    resolver.resolve(target);
}

export default function errorMiddlewarePlugin(options) {
    return {
        facets: {
            errorMiddleware: {
                'initialize:after': errorMiddleware
            }
        }
    }
}
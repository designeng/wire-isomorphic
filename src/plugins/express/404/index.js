import showNotFoundPage from '../../../lib/express/showNotFoundPage';

function notFoundMiddleware(resolver, facet, wire) {
    const target = facet.target;

    target.use(function(req, res, next) {
        showNotFoundPage(req, res);
    });

    resolver.resolve(target);
}

export default function notFoundMiddlewarePlugin(options) {
    return {
        facets: {
            notFoundMiddleware: {
                'ready': notFoundMiddleware
            }
        }
    }
}
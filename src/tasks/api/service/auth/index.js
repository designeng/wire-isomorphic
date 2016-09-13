import User from '../../../../modules/users/entities/User';

export default function auth(route) {
    return function(request, response, next) {
        console.log('AUTH: ', response.body);

        response.writeHead(200, route.headers);
        response.end(JSON.stringify({ok: 1}));
    }
}
import jwt from 'jwt-simple';

export default function jwtVerify(app) {
    return (request, response, next) {
        let token = (request.body && request.body.access_token) 
            || (request.query && request.query.access_token) 
            || request.headers['x-access-token'];

        if (token) {
            try {
                let decoded = jwt.decode(token, app.get('jwtTokenSecret'));

                // handle token here

            } catch (err) {
                return next();
            }
        } else {
            next();
        }
    }
}
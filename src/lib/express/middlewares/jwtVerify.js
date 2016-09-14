import jwt from 'jwt-simple';

export default function jwtVerify(app, User) {
    return function(request, response, next) {
        let token = (request.body && request.body.access_token) 
            || (request.query && request.query.access_token) 
            || request.headers['x-access-token'];

        if (token) {
            try {
                let decoded = jwt.decode(token, app.get('jwtTokenSecret'));

                if (decoded.exp <= Date.now()) {
                    return response.end('Access token has expired', 400);
                } else {
                    User.findOne({ _id: decoded.iss }, function(err, user) {
                        // TODO: attach user object to request?
                        // or check user permissions here?
                        
                        console.log('USERNAME:::', user.username);
                        
                        request.user = user;
                        next();
                    });
                }

            } catch (err) {
                return next();
            }
        } else {
            next();
        }
    }
}
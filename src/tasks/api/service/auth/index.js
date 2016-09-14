import User from '../../../../modules/users/entities/User';

export default function auth(route) {
    return function(request, response, next) {

        let username = request.body.username;
        let password = request.body.password;

        User.findOne({ username }, function(err, user) {
            if (err) {
                return response.end(JSON.stringify({ ERROR: err }));
            } else {
                if(user) {
                    user.comparePassword(password, function(err, isMatch) {
                        if (err) throw err;

                        if(isMatch) {
                            // TODO: should return jwt token
                            response.writeHead(200, route.headers);
                            response.end(JSON.stringify({ res: isMatch }));
                        } else {
                            // incorrect password
                            return response.sendStatus(401);
                        }
                    });
                } else {
                    // response.end(JSON.stringify({ res: `No such user with username ${username}` }));
                    // incorrect username
                    return response.sendStatus(401);
                }
            }
        });
    }
}
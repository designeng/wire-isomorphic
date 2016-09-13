import User from '../../../../modules/users/entities/User';

export default function auth(route) {
    return function(request, response, next) {
        response.writeHead(200, route.headers);

        let username = request.body.username;
        let password = request.body.password;

        User.findOne({ username }, function(err, user) {
            if (err) {
                return response.end(JSON.stringify({ ERROR: err }));
            } else {
                if(user) {
                    user.comparePassword(password, function(err, isMatch) {
                        if (err) throw err;
                        response.end(JSON.stringify({ res: isMatch }));
                    });
                } else {
                    response.end(JSON.stringify({ res: `No such user with username ${username}` }));
                }
            }
        });
    }
}
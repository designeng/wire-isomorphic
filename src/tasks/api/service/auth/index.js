import User from '../../../../modules/users/entities/User';

export default function auth(route) {
    return function(request, response, next) {

        let username = request.body.username;
        let password = request.body.password;

        User.findOne({ username }, function(err, user) {
            if (err) throw err;

            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                response.writeHead(200, route.headers);
                response.end(JSON.stringify({ res: isMatch }));
            });

            // // test a failing password
            // user.comparePassword('123Password', function(err, isMatch) {
            //     if (err) throw err;
            //     console.log('123Password:', isMatch); // -> 123Password: false
            // });
        });
    }
}
import User from '../../../../modules/users/entities/User';
import jwt from 'jwt-simple';
import moment from 'moment';

export default function auth(app, route) {
    return function(request, response, next) {

        let username = request.body.username;
        let password = request.body.password;

        User.findOne({ username }, function(err, user) {
            if (err) {
                return response.end(JSON.stringify({ ERROR: err }));
            } else {
                if(user) {
                    user.comparePasswordP(password).then((isMatch) => {
                        if(isMatch) {
                            let expires = moment().add('days', 7).valueOf();
                            let token = jwt.encode({
                                iss: user._id,
                                exp: expires
                            }, app.get('jwtTokenSecret'));

                            response.json({
                                token : token,
                                expires: expires,
                                user: user.toJSON()
                            });
                        } else {
                            // incorrect password
                            return response.sendStatus(401);
                        }
                    }).catch((err) => {throw err});
                } else {
                    // incorrect username
                    return response.sendStatus(401);
                }
            }
        });
    }
}
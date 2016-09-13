// TODO: dev mode, remove later
import User from './modules/users/entities/User';

// const populationCallback = (err) => {
//     if(err) {
//         return console.log('ERROR', err);
//     } else {
//         console.log('saved');
//     }
// }

const populate = () => {

    let testUser = new User({
        username: 'jmar777',
        password: 'Password123'
    });

    return;

    testUser.save(function(err, res) {
        if (err) throw err;

        console.log('SAVED::::', res);
    });
}

export default populate;
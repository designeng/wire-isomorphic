// TODO: dev mode, remove later
// import User from ...

import md5 from 'md5';

const populationCallback = (err) => {
    if(err) {
        return console.log('ERROR', err);
    } else {
        console.log('saved');
    }
}

const populate = () => {
    let user1 = new User();
    user1.name = 'richard';
    user1.pass = md5('pass1');
    user1.save(populationCallback);

    let user2 = new User();
    user2.name = 'john';
    user2.pass = md5('pass2');
    user2.save(populationCallback);
}
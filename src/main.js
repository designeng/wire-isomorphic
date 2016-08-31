import wire from 'essential-wire';
import pipeline from 'when/pipeline';

import expressSpec from './app.express.spec';
import { createTasks, createTask } from './utils/tasks';
import Timer from './utils/timer';

import mongoose from 'mongoose';
import User from './models/User';
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

pipeline(createTasks([expressSpec])).then(context => {
    // populate();
}).otherwise(error => {
    const errorMessage = `Express.js is not started! ${JSON.stringify(error)} (${new Timer().getFormattedTime()})`;
    console.error(errorMessage);
});
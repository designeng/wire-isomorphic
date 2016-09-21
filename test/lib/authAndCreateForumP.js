import when from 'when';
import pipeline from 'when/pipeline';

import mongoose from 'mongoose';
import User from '../../src/modules/users/entities/User';

import axios from 'axios';

let Promise = when.promise;

let userData = {
    username: 'admin', 
    password: 'admin',
    role: 'moderator'
};

const appHost = `localhost:3000`;
const baseApiPath = `/api/v1`;

let authRequestConfig = {
    method: 'post',
    url: `http://${appHost}${baseApiPath}/auth`,
    data: userData
};

function connect() {
    let db = `mongodb://localhost:27017/isomorphic_dev`;
    let options = { server: { socketOptions: { keepAlive: 1 }}};
    return mongoose.connect(db, options).connection;
}

const establishConnectionP = () => {
    return Promise((resolve, reject) => {
        connect()
            .on('error', console.log)
            .on('disconnected', connect)
            .once('open', (db) => {
                resolve(db);
            });
    });
}

const authAsAdminP = () => {
    return axios(authRequestConfig);
}

export default function authAndCreateForumP() {
    return pipeline([establishConnectionP, authAsAdminP]);
}
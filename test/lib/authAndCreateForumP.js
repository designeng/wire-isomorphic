import _ from 'underscore';
import when from 'when';
import pipeline from 'when/pipeline';

import mongoose from 'mongoose';
import User from '../../src/modules/users/entities/User';
import { host, baseApiPath } from './config';

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

let createForumRequestConfig = {
    method: 'post',
    url: `http://${appHost}${baseApiPath}/forums`
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

const createForumP = (response) => {
    let access_token = response.data.token;

    let forumData = {
        title: 'SOME_FORUM',
        access_token
    };

    _.extend(createForumRequestConfig, {data: forumData});

    console.log("FORUM CREATED");
    return axios(createForumRequestConfig);
}

const closeConnection = (res) => {
    mongoose.connection.close();
    console.log('CONNECTION CLOSED');
    return res;
}

export default function authAndCreateForumP() {
    return pipeline([establishConnectionP, authAsAdminP, createForumP, closeConnection]);
}
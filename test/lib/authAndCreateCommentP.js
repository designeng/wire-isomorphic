import _ from 'underscore';
import when from 'when';
import pipeline from 'when/pipeline';

import mongoose from 'mongoose';
import User from '../../src/modules/users/entities/User';

import axios from 'axios';

import { protocol, host, port, baseApiPath } from '../lib/config';
let base = `${protocol}://${host}:${port}`;

let Promise = when.promise;

let userData = {
    username: 'admin', 
    password: 'admin',
    role: 'moderator'
};

let authRequestConfig = {
    method: 'post',
    url: `${base}${baseApiPath}/auth`,
    data: userData
};

let createCommentRequestConfig = {
    method: 'post',
    url: `${base}${baseApiPath}/comments`
};

const authAsAdminP = () => {
    return axios(authRequestConfig);
}

const createCommentP = (response) => {
    let access_token = response.data.token;

    let commentData = {
        title: 'SOME_COMMENT',
        access_token
    };

    _.extend(createCommentRequestConfig, {data: commentData});
    return axios(createCommentRequestConfig);
}

export default function authAndCreateCommentP() {
    return pipeline([authAsAdminP, createCommentP]);
}
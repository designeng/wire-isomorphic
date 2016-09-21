import chai, { expect } from 'chai';
import request from 'supertest';
import moment from 'moment';
import when from 'when';
import pipeline from 'when/pipeline';
import _ from 'underscore';

import { protocol, host, port, baseApiPath } from '../lib/config';
let base = `${protocol}://${host}:${port}`;

import authAndCreateForumP from '../lib/authAndCreateForumP';

let unixtime = moment().format('unix');

let forumId;

before(() => {
    it('should return created forum', (done) => {
        authAndCreateForumP().then((forum) => {
            console.log('FORUM:::', forum);
            done();
        });
    });
});

describe('/forums', () => {

    it('CREATE', (done) => {
        let forumData = { 
            title : `FORUM_TITLE_${unixtime}`
        };

        request(base)
            .post(`${baseApiPath}/forums`)
            .send(forumData)
            .expect(401, done)
    });

    it('READ', (done) => {
        request(base)
            .get(`${baseApiPath}/forums/${forumId}`)
            .expect((res) => {
                expect(res.body.data[0]._id).to.be.ok;
            })
            .expect(200, done)
    });

    it('UPDATE', (done) => {
        let forum = { title : `FORUM_TITLE_${unixtime}`};

        request(base)
            .put(`${baseApiPath}/forums/${forumId}`)
            .send(forum)
            .expect(401, done)
    });

    it('DELETE', (done) => {
        request(base)
            .del(`${baseApiPath}/forums/${forumId}`)
            .expect(401, done)
    });
});
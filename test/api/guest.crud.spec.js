import chai, { expect } from 'chai';
import request from 'supertest';
import moment from 'moment';
import when from 'when';
import pipeline from 'when/pipeline';
import _ from 'underscore';

import { host, baseApiPath } from '../lib/config';
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

        request(host)
            .post(`${baseApiPath}/forums`)
            .send(forumData)
            .expect(401, done)
    });

    it('READ', (done) => {
        request(host)
            .get(`${baseApiPath}/forums/${forumId}`)
            .expect((res) => {
                expect(res.body.data[0]._id).to.be.ok;
            })
            .expect(200, done)
    });

    it('UPDATE', (done) => {
        let forum = { title : `FORUM_TITLE_${unixtime}`};

        request(host)
            .put(`${baseApiPath}/forums/${forumId}`)
            .send(forum)
            .expect(401, done)
    });

    it('DELETE', (done) => {
        request(host)
            .del(`${baseApiPath}/forums/${forumId}`)
            .expect(401, done)
    });
});
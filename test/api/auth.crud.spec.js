import chai, { expect } from 'chai';
import request from 'supertest';
import moment from 'moment';
import when from 'when';
import _ from 'underscore';

import { protocol, host, port, baseApiPath } from '../lib/config';
let base = `${protocol}://${host}:${port}`;

console.log('BASE', base);

let titleRegex = /FORUM_TITLE_/;
let unixtime = moment().format('unix');

let forumId;
let access_token;

before(() => {
    it('SHOULD PASS AUTH', (done) => {
        request(base)
            .post(`${baseApiPath}/auth`)
            .send({
                username: 'admin',
                password: 'admin',
            })
            .expect((res) => {
                access_token = res.body.token;
                expect(_.isObject(res)).to.be.ok;
            })
            .expect(200, done);
    });
});

describe('/forums', () => {

    it('CREATE', (done) => {
        let forumData = { 
            title : `FORUM_TITLE_${unixtime}`,
            access_token
        };

        request(base)
            .post(`${baseApiPath}/forums`)
            .send(forumData)
            .expect((res) => {
                forumId = res.body.data._id;
                expect(res.body.data._id).to.be.ok;
                expect(res.body.data.title).to.be.ok;
            })
            .expect(200, done)
    });

    it('READ', (done) => {
        request(base)
            .get(`${baseApiPath}/forums/${forumId}`)
            .set('x-access-token', access_token)
            .expect((res) => {
                expect(res.body.data[0]._id).to.equal(forumId);
                expect(res.body.data[0].title.match(titleRegex)).to.be.ok;
            })
            .expect(200, done)
    });

    it('UPDATE', (done) => {
        let forum = { title : `FORUM_TITLE_${unixtime}`};

        request(base)
            .put(`${baseApiPath}/forums/${forumId}`)
            .set('x-access-token', access_token)
            .send(forum)
            .expect((res) => {
                expect(res.body.data._id).to.equal(forumId);
                expect(res.body.data.title.match(titleRegex)).to.be.ok;
            })
            .expect(200, done)
    });

    it('DELETE', (done) => {
        request(base)
            .del(`${baseApiPath}/forums/${forumId}`)
            .set('x-access-token', access_token)
            .expect((res) => {
                expect(res.body.data.ok).to.equal(1);
                expect(res.body.data.n).to.equal(1);
            })
            .expect(200, done)
    });
});
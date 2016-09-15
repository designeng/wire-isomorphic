import chai, { expect } from 'chai';
import request from 'supertest';
import moment from 'moment';
import when from 'when';
import pipeline from 'when/pipeline';
import _ from 'underscore';

// TODO: read from application config
const host = `http://localhost:3000`;
const baseApiPath = `/api/v1`;

let titleRegex = /FORUM_TITLE_/;
let unixtime = moment().format('unix');

let forumId;

describe('/forums', () => {

    it('SHOULD PASS AUTH', (done) => {
        request(host)
            .post(`${baseApiPath}/auth`)
            .send({
                username: 'admin',
                password: 'admin'
            })
            .expect((res) => {
                expect(_.isObject(res)).to.be.ok;
            })
            .expect(200, done);
    });


    it('CREATE', (done) => {
        let forum = { title : `FORUM_TITLE_${unixtime}`};

        request(host)
            .post(`${baseApiPath}/forums`)
            .send(forum)
            .expect((res) => {
                forumId = res.body.data._id;
                expect(res.body.data._id).to.be.ok;
                expect(res.body.data.title).to.be.ok;
            })
            .expect(200, done)
    });

    it('READ', (done) => {
        request(host)
            .get(`${baseApiPath}/forums/${forumId}`)
            .expect((res) => {
                expect(res.body.data[0]._id).to.equal(forumId);
                expect(res.body.data[0].title.match(titleRegex)).to.be.ok;
            })
            .expect(200, done)
    });

    it('UPDATE', (done) => {
        let forum = { title : `FORUM_TITLE_${unixtime}`};

        request(host)
            .put(`${baseApiPath}/forums/${forumId}`)
            .send(forum)
            .expect((res) => {
                expect(res.body.data._id).to.equal(forumId);
                expect(res.body.data.title.match(titleRegex)).to.be.ok;
            })
            .expect(200, done)
    });

    it('DELETE', (done) => {
        request(host)
            .del(`${baseApiPath}/forums/${forumId}`)
            .expect((res) => {
                expect(res.body.data.ok).to.equal(1);
                expect(res.body.data.n).to.equal(1);
            })
            .expect(200, done)
    });
});
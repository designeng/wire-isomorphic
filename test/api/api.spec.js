import chai, { expect } from 'chai';
import request from 'supertest';
import moment from 'moment';

// TODO: read from application config
const host = `http://localhost:3000`;
const baseApiPath = `/api/v1`;

let titleRegex = /FORUM_TITLE_/;
let unixtime = moment().format('unix');

let forumId = `57d686109feaa25254346e1e`;

describe('/forums', () => {

    it('CREATE', (done) => {
        let forum = { title : `FORUM_TITLE_${unixtime}`};

        request(host)
            .post(`${baseApiPath}/forums`)
            .send(forum)
            .expect(function(res) {
                expect(res.body.data._id).to.be.ok;
                expect(res.body.data.title).to.be.ok;
            })
            .expect(200, done)
        });

    it('READ', (done) => {
        request(host)
            .get(`${baseApiPath}/forums/${forumId}`)
            .expect(function(res) {
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
            .expect(function(res) {
                expect(res.body.data._id).to.equal(forumId);
                expect(res.body.data.title.match(titleRegex)).to.be.ok;
            })
            .expect(200, done)
        });
});
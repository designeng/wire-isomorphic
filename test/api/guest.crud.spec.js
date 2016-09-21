import chai, { expect } from 'chai';
import request from 'supertest';
import moment from 'moment';
import when from 'when';
import pipeline from 'when/pipeline';
import _ from 'underscore';

import { protocol, host, port, baseApiPath } from '../lib/config';
let base = `${protocol}://${host}:${port}`;

import authAndCreateCommentP from '../lib/authAndCreateCommentP';

let unixtime = moment().format('unix');

let commentId;

before(() => {
    it('should return created comment', (done) => {
        authAndCreateCommentP().then((comment) => {
            expect(comment._id).to.be.ok;
            expect(comment.uid).to.be.ok;
            done();
        });
    });
});

// TODO: run app before tests running with appropriate permissions
describe('/comments', () => {
    it('CREATE should fail', (done) => {
        let commentData = { 
            title : `COMMENT_TITLE_${unixtime}`
        };

        request(base)
            .post(`${baseApiPath}/comments`)
            .send(commentData)
            .expect(401, done)
    });

    it('READ should pass', (done) => {
        request(base)
            .get(`${baseApiPath}/comments`)
            .expect((res) => {
                expect(res.body.data[0]._id).to.be.ok;
            })
            .expect(200, done)
    });

    it('UPDATE should fail', (done) => {
        let forum = { title : `COMMENT_TITLE_${unixtime}`};

        request(base)
            .put(`${baseApiPath}/comments/${commentId}`)
            .send(forum)
            .expect(401, done)
    });

    it('DELETE should fail', (done) => {
        request(base)
            .del(`${baseApiPath}/comments/${commentId}`)
            .expect(401, done)
    });
});
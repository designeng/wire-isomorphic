import chai, { expect } from 'chai';
import request from 'supertest';
import moment from 'moment';
import when from 'when';
import pipeline from 'when/pipeline';
import _ from 'underscore';

// TODO: read from application config
const host = `http://localhost:3000`;
const baseApiPath = `/api/v1`;

describe('auth', () => {

    it('SHOULD PASS AUTH', (done) => {
        request(host)
            .post(`${baseApiPath}/auth`)
            .send({
                username: 'richard',
                password: '123'
            })
            .expect((res) => {
                expect(_.isObject(res)).to.be.ok;
            })
            .expect(200, done);
    });
});
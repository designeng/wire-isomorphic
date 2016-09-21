import chai, { expect } from 'chai';
import request from 'supertest';
import _ from 'underscore';
import User from '../../src/modules/users/entities/User';
import { establishConnection, closeConnection } from '../lib/connect';

import { protocol, host, port, baseApiPath } from '../lib/config';
let base = `${protocol}://${host}:${port}`;

let userId;

const userData = {
    username: 'dick',
    password: '123'
}

before(establishConnection);

describe('USER', () => {
    it('SHOULD COMPARE PASSWORD', (done) => {
        let user = new User(userData).save((err, user) => {
            expect(err).not.to.be.ok;
            expect(user).to.be.ok;
            userId = user._id;
            user.comparePassword('123', function(err, isMatch) {
                if (err) throw err;
                expect(isMatch).to.be.ok;
                done();
            });
        });
    });

    it('SHOULD PASS AUTH', (done) => {
        request(base)
            .post(`${baseApiPath}/auth`)
            .send(userData)
            .expect((res) => {
                expect(_.isString(res.body.token)).to.be.ok;
            })
            .expect(200, done);
    });
});

after((done) => {
    User.remove({_id: userId}, function(err, user) {
        closeConnection();
        done();
    });
})
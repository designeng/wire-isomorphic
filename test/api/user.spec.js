import chai, { expect } from 'chai';
import User from '../../src/modules/users/entities/User';
import { establishConnection, closeConnection } from '../lib/connect';

let userId;

beforeEach(establishConnection);

describe('user', () => {
    it('should compare password', (done) => {
        let user = new User({
            username: 'dick',
            password: '123'
        }).save((err, user) => {
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
});

afterEach((done) => {
    User.remove({_id: userId}, function(err, user) {
        closeConnection();
        done();
    })
})
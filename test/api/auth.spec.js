import chai, { expect } from 'chai';
import request from 'supertest';

// TODO: read from application config
const host = `http://localhost:3000`;
const baseApiPath = `/api/v1`;

beforeEach(function() {
    let user = {}
    request(host)
        .post(`${baseApiPath}/auth`)
        .send(forum)
        .expect((res) => {

        })
        .expect(200, done)
});

describe('auth test', () => {
    it('should use permissions table', (done) => {
        
    });

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
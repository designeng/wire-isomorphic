import chai, { expect } from 'chai';
import request from 'supertest';

const host = `http://localhost:3000`;
const baseApiPath = `/api/v1`;

describe('api tests', () => {

    it('should save forum', (done) => {
        let forum = { title : 'FORUM_TITLE'};

        request(host)
            .post(`${baseApiPath}/forums`)
            .send(forum)
            .expect(function(res) {
                expect(res.body.data._id).to.be.ok;
            })
            .expect(200, done)
        });
});
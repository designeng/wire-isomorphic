import chai, { expect } from 'chai';
import request from 'supertest';

// TODO: read from application config
const host = `http://localhost:3000`;
const baseApiPath = `/api/v1`;

describe('/forums', () => {

    it('CREATE', (done) => {
        let forum = { title : 'FORUM_TITLE'};

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
            .get(`${baseApiPath}/forums/57d67dbdedf6e9f54bf01099`)
            .expect(function(res) {
                expect(res.body.data[0]._id).to.equal(`57d67dbdedf6e9f54bf01099`);
                expect(res.body.data[0].title).to.equal(`FORUM_TITLE`);
            })
            .expect(200, done)
        });
});
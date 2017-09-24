import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

import apiOnly from '../server/apiOnly';

chai.use(chaiHttp);

describe('Api', () => {
  it('Responds to GET /api/blog/:pageOrUrlKey for page', (done) => {
    chai.request(apiOnly)
      .get('/api/blog/1')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(
          res.body,
          [
            'entries',
            'pagination',
          ],
        );
        done();
      });
  });

  it('Responds to GET /api/blog/:pageOrUrlKey for urlKey', (done) => {
    chai.request(apiOnly)
      .get('/api/blog/everything-is-more-complex-than-we-think-it-is')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(
          res.body,
          [
            'entries',
          ],
        );
        done();
      });
  });

  it('Responds to GET /api/blog/archive', (done) => {
    chai.request(apiOnly)
      .get('/api/blog/archive')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(
          res.body[0],
          [
            'year',
            'entries',
          ],
        );
        done();
      });
  });

  it('Responds to GET /api/side-projects', (done) => {
    chai.request(apiOnly)
      .get('/api/side-projects')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(
          res.body[0],
          [
            'id',
            'name',
            'description',
            'homepage_url',
            'github_url',
            'image_url',
            'state',
            'blogEntries',
          ],
        );
        done();
      });
  });

  it('Responds to GET /api/pokemon-go/map-objects', (done) => {
    chai.request(apiOnly)
      .get('/api/pokemon-go/map-objects')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(
          res.body,
          [
            'gyms',
            'pokestops',
          ],
        );
        done();
      });
  });
});

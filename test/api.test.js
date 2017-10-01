import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

import apiOnly from '../server/apiOnly';

chai.use(chaiHttp);

const blog = {
  entries: {
    id: '',
    url: '',
    title: '',
    html: '',
    excerpt: '',
    published: '',
    side_project_id: '',
  },
  archive: {
    entries: '',
    year: '',
  },
  totalPages: '',
};

const sideProjects = {
  id: '',
  name: '',
  description: '',
  homepage_url: '',
  github_url: '',
  image_url: '',
  state: '',
  blogEntries: '',
};


describe('Api', () => {
  it('Responds to GET /api/blog/:pageOrUrlKey for page', (done) => {
    chai.request(apiOnly)
      .get('/api/blog/1')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(res.body, Object.keys(blog));
        assert.hasAllKeys(res.body.entries[0], Object.keys(blog.entries));
        assert.hasAllKeys(res.body.archive[0], Object.keys(blog.archive));
        assert.equal(Number.isInteger(res.body.totalPages), true);
        done();
      });
  });

  it('Responds to GET /api/blog/:pageOrUrlKey for urlKey', (done) => {
    chai.request(apiOnly)
      .get('/api/blog/everything-is-more-complex-than-we-think-it-is')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(res.body, Object.keys(blog));
        assert.hasAllKeys(res.body.entries[0], Object.keys(blog.entries));
        assert.hasAllKeys(res.body.archive[0], Object.keys(blog.archive));
        assert.equal(Number.isInteger(res.body.totalPages), true);
        assert.equal(res.body.entries.length, 1);
        done();
      });
  });

  it('Responds to GET /api/side-projects', (done) => {
    chai.request(apiOnly)
      .get('/api/side-projects')
      .end((err, res) => {
        assert.equal(err, null);
        assert.equal(res.statusCode, 200);
        assert.hasAllKeys(res.body[0], Object.keys(sideProjects));
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

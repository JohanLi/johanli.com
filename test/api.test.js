import chai from 'chai';
import chaiHttp from 'chai-http';

import apiOnly from '../server/apiOnly';

chai.use(chaiHttp);

const published = {
  timestamp: expect.any(Number),
  month: expect.any(String),
  date: expect.any(Number),
  year: expect.any(Number),
};

const blog = {
  entries: expect.arrayContaining([
    {
      id: expect.any(Number),
      url: expect.any(String),
      title: expect.any(String),
      html: expect.any(String),
      excerpt: expect.any(String),
      published,
      side_project_id: expect.any(Number),
    },
  ]),
  archive: expect.arrayContaining([
    {
      entries: expect.arrayContaining([
        {
          url: expect.any(String),
          title: expect.any(String),
          published,
        },
      ]),
      year: expect.any(Number),
    },
  ]),
  totalPages: expect.any(Number),
};

const sideProjects = expect.arrayContaining([
  {
    id: expect.any(Number),
    name: expect.any(String),
    description: expect.any(String),
    homepage_url: expect.any(String),
    github_url: expect.any(String),
    image_url: expect.any(String),
    state: expect.any(Number),
    blogEntries: expect.arrayContaining([
      {
        url: expect.any(String),
        title: expect.any(String),
      },
    ]),
  }
]);

const mapObject = {
  id: expect.any(String),
  type: expect.any(Number),
  latitude: expect.any(String),
  longitude: expect.any(String),
  neighbor_count: expect.any(Number),
  neighbor_group_count: expect.any(Number),
};

const mapObjects = {
  gyms: expect.arrayContaining([mapObject]),
  pokestops: expect.arrayContaining([mapObject]),
};

describe('Api', () => {
  it('Responds to GET /api/blog/:pageOrUrlKey for page', (done) => {
    chai.request(apiOnly)
      .get('/api/blog/1')
      .end((err, res) => {
        expect(err).toEqual(null);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(blog);
        expect(res.body.entries.length).toBeGreaterThan(1);
        done();
      });
  });

  it('Responds to GET /api/blog/:pageOrUrlKey for urlKey', (done) => {
    chai.request(apiOnly)
      .get('/api/blog/everything-is-more-complex-than-we-think-it-is')
      .end((err, res) => {
        expect(err).toEqual(null);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(blog);
        expect(res.body.entries.length).toEqual(1);
        done();
      });
  });

  it('Responds to GET /api/side-projects', (done) => {
    chai.request(apiOnly)
      .get('/api/side-projects')
      .end((err, res) => {
        expect(err).toEqual(null);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(sideProjects);
        done();
      });
  });

  it('Responds to GET /api/pokemon-go/map-objects', (done) => {
    chai.request(apiOnly)
      .get('/api/pokemon-go/map-objects')
      .end((err, res) => {
        expect(err).toEqual(null);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mapObjects);
        done();
      });
  });
});

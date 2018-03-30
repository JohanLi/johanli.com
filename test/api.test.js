import request from 'request-promise';

import server from '../server/apiOnly';

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

const r = request.defaults({
  baseUrl: 'http://localhost:8081',
  json: true,
});

describe('Api', () => {
  it('Responds to GET /api/blog/:pageOrUrlKey for page', async () => {
    expect.assertions(2);

    const res = await r('/api/blog/1');
    expect(res).toEqual(blog);
    expect(res.entries.length).toBeGreaterThan(1);
  });

  it('Responds to GET /api/blog/:pageOrUrlKey for urlKey', async () => {
    expect.assertions(2);

    const res = await r('/api/blog/everything-is-more-complex-than-we-think-it-is');
    expect(res).toEqual(blog);
    expect(res.entries.length).toEqual(1);
  });

  it('Responds to GET /api/side-projects', async () => {
    expect.assertions(1);

    const res = await r('/api/side-projects');
    expect(res).toEqual(sideProjects);
  });

  it('Responds to GET /api/pokemon-go/map-objects', async () => {
    expect.assertions(1);

    const res = await r('/api/pokemon-go/map-objects');
    expect(res).toEqual(mapObjects);
  });
});

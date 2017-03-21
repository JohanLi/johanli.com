const express = require('express');

const router = express.Router();

const blog = require('../models/blog');
const sideProjects = require('../models/side-projects');
const pokemonGoMap = require('../models/pokemon-go-map');

router.get('/', async (request, response) => {
  const blogEntries = await blog.getAll();

  response.render('home', {
    title: 'Johan Li | Web Developer',
    metaDescription: '',
    navitem: 'home',
    blogEntries,
  });
});

router.get('/blog', async (request, response) => {
  const entries = await blog.getAll();

  response.render('blog', {
    title: 'Blog | Johan Li',
    metaDescription: '',
    navitem: 'blog',
    entries,
  });
});

router.get('/blog/:blogUrl', async (request, response) => {
  const [entries, pagination] = await blog.getByUrl(request.params.blogUrl);

  response.render('blog', {
    title: `${entries[0].title} | Johan Li`,
    metaDescription: '',
    navitem: 'blog',
    entries,
    pagination,
  });
});

router.get('/side-projects', async (request, response) => {
  const projects = await sideProjects.getAll();

  response.render('side-projects', {
    title: 'Side Projects | Johan Li',
    navitem: 'side-projects',
    projects,
  });
});

router.get('/pokemon-go/map', (request, response) => {
  response.render('pokemon-go/map', {
    title: 'Pokestops and Gyms in Stockholm | Johan Li',
    navitem: 'side-projects',
  });
});

router.get('/pokemon-go/map-objects', async (request, response) => {
  const mapObjects = await pokemonGoMap.getMapObjects();
  return response.json(mapObjects);
});

module.exports = router;

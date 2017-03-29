const express = require('express');

const router = express.Router();

const blog = require('../models/blog');
const sideProjects = require('../models/side-projects');
const pokemonGoMap = require('../models/pokemon-go-map');

router.get('/', async (request, response) => {
  const blogEntries = await blog.getPage(1);

  response.render('home', {
    title: 'Johan Li | Web Developer',
    metaDescription: '',
    navitem: 'home',
    blogEntries,
  });
});

router.get('/blog', async (request, response) => {
  const page = 1;
  const entries = await blog.getPage(page);
  const pagination = await blog.getPagination(page);

  response.render('blog', {
    title: 'Blog | Johan Li',
    metaDescription: '',
    navitem: 'blog',
    entries,
    pagination,
  });
});

router.get('/blog/:page([0-9]+)', async (request, response) => {
  const page = parseInt(request.params.page);
  const entries = await blog.getPage(page);
  const pagination = await blog.getPagination(page);

  response.render('blog', {
    title: 'Blog | Johan Li',
    metaDescription: '',
    navitem: 'blog',
    entries,
    pagination,
  });
});

router.get('/blog/:blogUrl', async (request, response) => {
  const entries = await blog.getByUrl(request.params.blogUrl);
  const singlePagination = await blog.getSinglePagination(entries[0].id);

  response.render('blog', {
    title: `${entries[0].title} | Johan Li`,
    metaDescription: '',
    navitem: 'blog',
    entries,
    singlePagination,
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

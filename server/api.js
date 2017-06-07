const express = require('express');
const router = express.Router();
const cache = require('./cache');

const blog = require('./models/blog');
const sideProjects = require('./models/side-projects');
const pokemonGoMap = require('./models/pokemon-go-map');

router.get('/blog/:page([0-9]+)', async (req, res) => {
  const page = parseInt(req.params.page, 10);
  const entries = await cache.remember(`/blog/${page}`, () => blog.getPage(page));

  res.json(entries);
});

router.get('/blog/archive', async (req, res) => {
  const archive = await cache.remember('/blog/archive', () => blog.getArchive());

  res.json(archive);
});

router.get('/blog/:urlKey', async (req, res) => {
  const urlKey = req.params.urlKey;
  const entries = await cache.remember(`/blog/${urlKey}`, () => blog.getByUrlKey(urlKey));

  res.json({ entries });
});

router.get('/side-projects', async (req, res) => {
  const projects = await cache.remember(`/side-projects`, () => sideProjects.getAll());

  res.json(projects);
});

router.get('/pokemon-go/map-objects', async (req, res) => {
  const mapObjects = await cache.remember(`/pokemon-go/map-objects`, () => pokemonGoMap.getMapObjects());

  res.json(mapObjects);
});

module.exports = router;

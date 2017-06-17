const express = require('express');
const cache = require('../cache');
const blog = require('./models/blog');
const sideProjects = require('./models/side-projects');
const pokemonGoMap = require('./models/pokemon-go-map');

const router = express.Router();

router.get('/blog/latest', async (req, res) => {
  const entries = await cache.remember('/blog/latest', () => blog.getLatest());

  res.json(entries);
});

router.get('/blog/archive', async (req, res) => {
  const archive = await cache.remember('/blog/archive', () => blog.getArchive());

  res.json(archive);
});

router.get('/blog/:pageOrUrlKey', async (req, res) => {
  const entries = await cache.remember(`/blog/${req.params.pageOrUrlKey}`, () => blog.getPage(req.params.pageOrUrlKey));

  res.json(entries);
});

router.get('/side-projects', async (req, res) => {
  const projects = await cache.remember('/side-projects', () => sideProjects.getAll());

  res.json(projects);
});

router.get('/pokemon-go/map-objects', async (req, res) => {
  const mapObjects = await cache.remember('/pokemon-go/map-objects', () => pokemonGoMap.getMapObjects());

  res.json(mapObjects);
});

module.exports = router;

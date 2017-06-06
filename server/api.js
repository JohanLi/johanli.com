const express = require('express');
const router = express.Router();

const blog = require('./models/blog');
const sideProjects = require('./models/side-projects');
const pokemonGoMap = require('./models/pokemon-go-map');

router.get('/blog/:page([0-9]+)', async (req, res) => {
  const page = parseInt(req.params.page, 10);

  const entries = await blog.getPage(page);
  const pagination = await blog.getPagination(page);

  res.json({
    entries,
    pagination,
  });
});

router.get('/blog/archive', async (req, res) => {
  const archive = await blog.getArchive();
  res.json(archive);
});

router.get('/blog/:blogUrl', async (req, res) => {
  const entries = await blog.getByUrl(req.params.blogUrl);
  res.json({ entries });
});

router.get('/side-projects', async (req, res) => {
  const projects = await sideProjects.getAll();
  res.json(projects);
});

router.get('/pokemon-go/map-objects', async (req, res) => {
  const mapObjects = await pokemonGoMap.getMapObjects();
  res.json(mapObjects);
});

module.exports = router;

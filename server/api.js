const express = require('express');
const router = express.Router();

const blog = require('./models/blog');
const sideProjects = require('./models/side-projects');
const pokemonGoMap = require('./models/pokemon-go-map');

router.get('/blog/latest', async (req, res) => {
  const blogEntries = await blog.getPage(1);
  res.json(blogEntries);
});

router.get('/blog/:page([0-9]+)?', async (req, res) => {
  let page = 1;

  if (req.params.page) {
    page = parseInt(req.params.page, 10);
  }

  const entries = await blog.getPage(page);
  const pagination = await blog.getPagination(page);
  const archive = await blog.getArchive();

  res.json({
    entries,
    pagination,
    archive,
  });
});

router.get('/blog/:blogUrl', async (req, res) => {
  const entries = await blog.getByUrl(req.params.blogUrl);
  const pagination = await blog.getSinglePagination(entries[0].id);
  const archive = await blog.getArchive();

  res.json({
    entries,
    pagination,
    archive,
  });
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

const express = require('express');
const router = express.Router();

const blog = require('./models/blog');
const sideProjects = require('./models/side-projects');
const pokemonGoMap = require('./models/pokemon-go-map');

router.get('/blog/latest', async (req, res) => {
  const blogEntries = await blog.getPage(1);
  res.json(blogEntries);
});

router.get('/side-projects', async (req, res) => {
  const projects = await sideProjects.getAll();
  res.json(projects);
});

module.exports = router;

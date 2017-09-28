import express from 'express';
import cache from '../cache';
import blog from './models/blog';
import sideProjects from './models/side-projects';
import pokemonGoMap from './models/pokemon-go-map';

const router = express.Router();

router.get('/blog/archive', async (req, res) => {
  const archive = await cache.remember('/blog/archive', () => blog.getArchive());

  res.json(archive);
});

router.get('/blog/total-pages', async (req, res) => {
  const entriesPerPage = 3;
  const totalPages = await cache.remember('/blog/total-pages', () => blog.getTotalPages(entriesPerPage));

  res.json(totalPages);
});

router.get('/blog/:pageOrUrlKey', async (req, res) => {
  const entriesPerPage = 3;
  let entries;

  if (isNaN(req.params.pageOrUrlKey)) {
    const page = req.params.pageOrUrlKey;
    entries = await cache.remember(`/blog/${page}`, () => blog.getPage(page, entriesPerPage));
  } else {
    const urlKey = req.params.pageOrUrlKey;
    entries = await cache.remember(`/blog/${urlKey}`, () => blog.getByUrlKey(urlKey));
  }

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

export default router;

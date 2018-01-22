import express from 'express';
import cache from '../cache';
import blogModel from './models/blog';
import sideProjects from './models/side-projects';
import pokemonGoMap from './models/pokemon-go-map';

const router = express.Router();

router.get('/blog/:pageOrUrlKey', async (req, res) => {
  let blog;

  if (Number.isNaN(req.params.pageOrUrlKey)) {
    const urlKey = req.params.pageOrUrlKey;
    blog = await cache.remember(`/blog/${urlKey}`, () => blogModel.getByUrlKey(urlKey));
  } else {
    const page = req.params.pageOrUrlKey;
    blog = await cache.remember(`/blog/${page}`, () => blogModel.getPage(page));
  }

  res.json(blog);
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

import express from 'express';
import blog from './models/blog';
import sideProjects from './models/side-projects';
import pokemonGoMap from './models/pokemon-go-map';

const router = express.Router();

router.get('/blog/archive', async (req, res) => {
  res.json(await blog.getArchive());
});

router.get('/blog/latest', async (req, res) => {
  res.json(await blog.getLatest());
});

router.get('/blog/:pageOrUrlKey', async (req, res) => {
  const { pageOrUrlKey } = req.params;

  if (/^[0-9]+$/.test(pageOrUrlKey)) {
    res.json(await blog.getPage(pageOrUrlKey));
  } else {
    res.json(await blog.getByUrlKey(pageOrUrlKey));
  }
});

router.get('/side-projects', async (req, res) => {
  res.json(await sideProjects.get());
});

router.get('/pokemon-go/map-objects', async (req, res) => {
  res.json(await pokemonGoMap.getMapObjects());
});

export default router;

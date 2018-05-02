import express from 'express';
import { handleError } from './helpers/error';
import blog from './models/blog';
import sideProjects from './models/side-projects';
import pokemonGoMap from './models/pokemon-go-map';

const router = express.Router();

router.get('/blog/archive', async (req, res) => {
  try {
    res.json(await blog.getArchive());
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/blog/latest', async (req, res) => {
  try {
    res.json(await blog.getLatest());
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/blog/:pageOrUrlKey', async (req, res) => {
  try {
    const { pageOrUrlKey } = req.params;
    let entries;

    if (/^[0-9]+$/.test(pageOrUrlKey)) {
      entries = await blog.getPage(pageOrUrlKey);
    } else {
      entries = await blog.getByUrlKey(pageOrUrlKey);
    }

    res.json(entries);
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/side-projects', async (req, res) => {
  try {
    res.json(await sideProjects.get());
  } catch (error) {
    handleError(res, error);
  }
});

router.get('/pokemon-go/map-objects', async (req, res) => {
  try {
    res.json(await pokemonGoMap.getMapObjects());
  } catch (error) {
    handleError(res, error);
  }
});

export default router;

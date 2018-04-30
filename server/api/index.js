import express from 'express';
import blog from './controllers/blog';
import sideProjects from './controllers/side-projects';
import pokemonGoMap from './controllers/pokemon-go-map';

const router = express.Router();

router.get('/blog', blog.getPage);
router.get('/blog/:page([0-9]+)', blog.getPage);
router.get('/blog/archive', blog.getArchive);
router.get('/blog/latest', blog.getLatest);
router.get('/blog/:urlKey', blog.getByUrlKey);

router.get('/side-projects', sideProjects.get);

router.get('/pokemon-go/map-objects', pokemonGoMap.getMapObjects);

export default router;

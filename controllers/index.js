const express = require('express');
const router = express.Router();

const blog = require('../models/blog');
const pokemonGoMap = require('../models/pokemon-go-map');

router.get('/', (request, response) => {

    blog.getAll()
        .then(entries => {
            response.render('home', {title: 'Johan Li | Web Developer', metaDescription: '', navitem: 'home', blogEntries: entries});
        });

});

router.get('/blog', (request, response) => {

    blog.getAll()
        .then(entries => {
            response.render('blog', {title: 'Blog | Johan Li', metaDescription: '', navitem: 'blog', entries: entries});
        });

});

router.get('/blog/:blogUrl', (request, response) => {

    blog.getByUrl(request.params.blogUrl)
        .then(entries => {
            response.render('blog', {title: entries[0].title + ' | Johan Li', metaDescription: '', navitem: 'blog', entries: entries});
        });

});

router.get('/pokemon-go/map', (request, response) => {
    response.render('pokemon-go/map', {title: 'Pokestops and Gyms in Stockholm | Johan Li', navitem: 'pokemon-go'});
});

router.get('/pokemon-go/map-objects', (request, response) => {

    pokemonGoMap.getMapObjects()
        .then(mapObjects => {
            response.json(mapObjects);
        });

});

module.exports = router;

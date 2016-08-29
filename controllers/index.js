var express = require('express');
var router = express.Router();

let blog = require('../models/blog');
let PokemonGoMap = require('../models/pokemon-go-map');

router.get('/', function(request, response) {

    blog.getAll()
        .then(function(entries) {
            response.render('home', {title: 'Johan Li | Web Developer', metaDescription: '', navitem: 'home', blogEntries: entries});
        });

});

router.get('/blog', function(request, response) {

    blog.getAll()
        .then(function(entries) {
            response.render('blog', {title: 'Blog | Johan Li', metaDescription: '', navitem: 'blog', entries: entries});
        });

});

router.get('/blog/:blogUrl', function(request, response) {

    blog.getByUrl(request.params.blogUrl)
        .then(function(entries) {
            response.render('blog', {title: entries[0].title + ' | Johan Li', metaDescription: '', navitem: 'blog', entries: entries});
        });

});

router.get('/pokemon-go/map', function(request, response) {
    response.render('pokemon-go/map', {title: 'Pokestops and Gyms in Stockholm | Johan Li', navitem: 'pokemon-go'});
});

router.get('/pokemon-go/map-objects', function(request, response) {

    PokemonGoMap.getMapObjects()
        .then(mapObjects => {
            response.json(mapObjects);
        });

});

module.exports = router;

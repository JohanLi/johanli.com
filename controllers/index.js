var express = require('express');
var router = express.Router();

var blog = require('../models/blog');

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

module.exports = router;

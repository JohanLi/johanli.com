var express = require('express');
var router = express.Router();

var blog = require('../models/blog');

router.get('/', function(req, res) {

    blog.get(function(entries) {
        res.render('home', {title: 'Johan Li | Web Developer', metaDescription: '', navitem: 'home', blogEntries: entries});
    });

});

router.get('/blog', function(req, res) {

    blog.get(function(entries) {
        res.render('blog', {title: 'Blog | Johan Li', metaDescription: '', navitem: 'blog', entries: entries});
    });

});

module.exports = router;

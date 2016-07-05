var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('home', { title: 'Johan Li | Web Developer', metaDescription: '', navitem: 'home' });
});

router.get('/blog', function(req, res) {
    res.render('blog', { title: 'Blog | Johan Li', metaDescription: '', navitem: 'blog' });
});

module.exports = router;

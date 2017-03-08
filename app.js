require('dotenv').config();

const express = require('express');
const path = require('path');
const routes = require('./controllers/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(8080);

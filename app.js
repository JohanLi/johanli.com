require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./controllers/index');
app.use('/', routes);

app.listen(8080);
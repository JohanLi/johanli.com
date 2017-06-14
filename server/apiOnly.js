require('dotenv').config();

const express = require('express');
const api = require('./api');

const app = express();

app.use('/api', api);

app.listen(8081);

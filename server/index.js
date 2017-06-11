require('dotenv').config();

const blogModel = require('./models/blog');
const sideProjectsModel = require('./models/side-projects');
const cache = require('./cache');

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import App from '../src/components/App';
import template from './template';

const express = require('express');
const app = express();

const api = require('./api');
app.use('/api', api);

app.use('/', express.static('dist'));

app.get('*', async (req, res) => {
  const context = {};
  const blog = {
    entries: await blogModel.getAllPages(),
    archive: await blogModel.getArchive(),
  };
  const sideProjects = await sideProjectsModel.getAll();

  const appHtml = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App
        blog={blog}
        sideProjects={sideProjects}
      />
    </StaticRouter>
  );

  res.send(template(appHtml))
});

app.listen(8081);

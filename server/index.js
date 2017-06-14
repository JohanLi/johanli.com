require('dotenv').config();
const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const path = require('path');

const blogModel = require('./api/models/blog');
const sideProjectsModel = require('./api/models/side-projects');
const cache = require('./cache');

import React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import App from '../client/components/App';

const express = require('express');
const app = express();

const api = require('./api');
app.use('/api', api);

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.get('*', async (req, res) => {
  const htmlData = await readFileAsync(path.resolve(__dirname, 'index.html'), 'utf8');

  const context = {};
  let blogPage = 1;

  const match = matchPath(req.url, {
    path: '/blog/:pageOrUrlKey',
  });

  if (match && match.params) {
    blogPage = match.params.pageOrUrlKey;
  }

  const blog = {
    entries: await blogModel.getPage(blogPage),
    archive: await blogModel.getArchive(),
  };
  const sideProjects = await
    sideProjectsModel.getAll();

  const html = renderToString(
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

  res.send(htmlData.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`
  ));
});

app.listen(8081);

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import App from '../client/components/App';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const blog = require('./api/models/blog');
const sideProjects = require('./api/models/side-projects');

const express = require('express');
const api = require('./api');

const readFileAsync = promisify(fs.readFile);

const app = express();

app.use('/api', api);

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.get('*', async (req, res) => {
  const context = {};
  const match = matchPath(req.url, {
    path: '/blog/:pageOrUrlKey?',
  });

  let blogPage;

  if (match) {
    blogPage = {
      entries: await blog.getPage(match.params.pageOrUrlKey),
      archive: await blog.getArchive(),
    };
  }

  const latestBlogEntries = await blog.getLatest();
  const projects = await sideProjects.getAll();

  let templateHtml = await readFileAsync(
    path.resolve(__dirname, 'index.html'),
    'utf8',
  );

  const appInitialState = {
    latestBlogEntries,
    blogPage,
    sideProjects: projects,
  };

  const appHtml = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App {...appInitialState} />
    </StaticRouter>,
  );

  templateHtml = templateHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  templateHtml = templateHtml.replace(
    '<script></script>',
    `<script>window.APP_INITIAL_STATE = ${JSON.stringify(appInitialState)}</script>`,
  );

  res.send(templateHtml);
});

app.listen(8080);

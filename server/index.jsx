import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import App from '../client/components/App';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const blogModel = require('./api/models/blog');
const sideProjectsModel = require('./api/models/side-projects');
const inlineCss = require('./render/inlineCss');

const express = require('express');
const cookieParser = require('cookie-parser');
const api = require('./api');

const readFileAsync = promisify(fs.readFile);

const app = express();

app.use('/api', api);
app.use(cookieParser());

// served by nginx in production
app.use(express.static(path.resolve(__dirname, 'public')));

const getBlog = async (req) => {
  const match = matchPath(req.url, {
    path: '/blog/:pageOrUrlKey?',
  });
  let pageOrUrlKey = 1;

  if (match) {
    pageOrUrlKey = match.params.pageOrUrlKey;
  }

  const blog = {
    entries: {},
    pages: {},
    pagination: {},
  };

  const { entries, pagination } = await blogModel.getPage(pageOrUrlKey);
  const blogPageRequested = !isNaN(pageOrUrlKey);

  entries.forEach((entry) => {
    blog.entries[entry.url] = entry;
  });

  if (blogPageRequested) {
    blog.pages[pageOrUrlKey] = entries.map(entry => entry.url);
  }

  blog.pagination = pagination;

  return blog;
};

app.get('*', async (req, res) => {
  const context = {};

  let templateHtml = await readFileAsync(
    path.resolve(__dirname, 'index.html'),
    'utf8',
  );

  const appInitialState = {
    blog: getBlog(req),
    archive: await blogModel.getArchive(),
    sideProjects: await sideProjectsModel.getAll(),
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
    '<title></title>',
    `<title>${DocumentTitle.rewind()}</title>`,
  );

  templateHtml = templateHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  templateHtml = templateHtml.replace(
    '<script></script>',
    `<script>window.APP_INITIAL_STATE = ${JSON.stringify(appInitialState)}</script>`,
  );

  templateHtml = await inlineCss(templateHtml, req, res);

  res.send(templateHtml);
});

app.listen(8080);

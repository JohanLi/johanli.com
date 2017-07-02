import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import App from '../client/components/App';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const blog = require('./api/models/blog');
const sideProjects = require('./api/models/side-projects');
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

app.get('*', async (req, res) => {
  const context = {};
  const match = matchPath(req.url, {
    path: '/blog/:pageOrUrlKey?',
  });

  let blogPage;

  if (match) {
    blogPage = await blog.getPage(match.params.pageOrUrlKey);
  }

  const latestBlogEntries = await blog.getLatest();
  const blogArchive = await blog.getArchive();
  const projects = await sideProjects.getAll();

  let templateHtml = await readFileAsync(
    path.resolve(__dirname, 'index.html'),
    'utf8',
  );

  const appInitialState = {
    latestBlogEntries,
    blogPage,
    blogArchive,
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

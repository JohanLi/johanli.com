import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { useStaticRendering } from 'mobx-react';

import appInitialState from '../../src/stores/helpers/app-initial-state';
import blog from '../api/models/blog';
import sideProjects from '../api/models/side-projects';

import inlineCss from './inlineCss';

const readFileAsync = promisify(fs.readFile);

const router = express.Router();

useStaticRendering(true);

router.get('*', async (req, res) => {
  const context = {};

  let templateHtml = await readFileAsync(
    path.resolve(__dirname, 'index.html'),
    'utf8',
  );

  appInitialState.new();

  const initialBlog = {
    latest: [],
    entries: [],
    archive: [],
    totalPages: 0,
  };

  if (req.url === '/') {
    initialBlog.latest = await blog.getLatest();
    appInitialState.set('blog', initialBlog);
  }

  if (req.url === '/side-projects') {
    appInitialState.set('sideProjects', await sideProjects.get());
  }

  const blogRequested = matchPath(req.url, {
    path: '/blog/:pageOrUrlKey?',
  });

  if (blogRequested) {
    const pageOrUrlKey = blogRequested.params.pageOrUrlKey || 1;

    if (/^[0-9]+$/.test(pageOrUrlKey)) {
      const [page, archive] = await Promise.all([
        blog.getPage(pageOrUrlKey),
        blog.getArchive(),
      ]);

      initialBlog.entries = page.entries;
      initialBlog.archive = archive;
      initialBlog.totalPages = page.totalPages;
    } else {
      const [entries, archive] = await Promise.all([
        blog.getByUrlKey(pageOrUrlKey),
        blog.getArchive(),
      ]);

      initialBlog.entries = [entries];
      initialBlog.archive = archive;
    }

    appInitialState.set('blog', initialBlog);
  }

  const App = require('../../src/components/App').default;

  const appHtml = renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
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
    `<script>window.APP_INITIAL_STATE = ${JSON.stringify(appInitialState.get())}</script>`,
  );

  templateHtml = await inlineCss(templateHtml, req, res);

  res.send(templateHtml);
});

export default router;

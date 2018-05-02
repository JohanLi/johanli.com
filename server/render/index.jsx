import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { useStaticRendering } from 'mobx-react';

import App from '../../src/components/App';

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

  const appInitialState = {};

  if (req.url === '/') {
    appInitialState.latestBlogEntries = await blog.getLatest();
  }

  if (req.url === '/side-projects') {
    appInitialState.sideProjects = await sideProjects.get();
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

      appInitialState.blog = {
        entries: page.entries,
        totalPages: page.totalPages,
        archive,
      };
    } else {
      const [entries, archive] = await Promise.all([
        blog.getByUrlKey(pageOrUrlKey),
        blog.getArchive(),
      ]);

      appInitialState.blog = {
        entries: [entries],
        totalPages: 0,
        archive,
      };
    }
  }

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

export default router;

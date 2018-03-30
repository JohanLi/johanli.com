import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import express from 'express';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import './config';
import App from '../src/components/App';

import sideProjectsModel from './api/models/side-projects';
import blog from './render/blog';
import inlineCss from './render/inlineCss';
import api from './api';

const readFileAsync = promisify(fs.readFile);

const app = express();

app.use('/api', api);
app.use(cookieParser());

// served by nginx in production
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', async (req, res) => {
  const context = {};

  let templateHtml = await readFileAsync(
    path.resolve(__dirname, 'index.html'),
    'utf8',
  );

  const appInitialState = {
    blog: await blog(req),
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

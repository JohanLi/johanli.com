import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import './config';
import api from './api';

const app = express();

app.use('/api', api);

if (process.env.NODE_ENV !== 'development') {
  // causes issues otherwise, when loading the non-bundled api endpoints during development
  // eslint-disable-next-line
  const render = require('./render').default;

  app.use(cookieParser());
  app.use(express.static(path.resolve(__dirname, 'public')));

  app.use('/', render);

  app.listen(8080);
} else {
  app.listen(8081);
}

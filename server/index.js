import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import './config';
import api from './api';

const app = express();

app.use('/api', api);

if (process.env.NODE_ENV !== 'development') {
  const render = require('./render').default;

  app.use(cookieParser());
  app.use(express.static(path.resolve(__dirname, 'public')));

  app.use('*', render);

  app.listen(8080);
} else {
  app.listen(8081);
}

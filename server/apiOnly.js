import express from 'express';

import './config';
import api from './api';

const app = express();

app.use('/api', api);

const server = app.listen(8081);

export default server;

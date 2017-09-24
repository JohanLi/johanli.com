import express from 'express';

import './config';
import api from './api';

const app = express();

app.use('/api', api);

app.listen(8081);

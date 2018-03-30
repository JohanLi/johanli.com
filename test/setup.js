import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import '../server/config';
import server from '../server/apiOnly';
import cache from '../server/cache';
import database from '../server/api/models/database';

configure({ adapter: new Adapter() });

afterAll(() => {
  server.close();
  cache.quit();
  database.end();
});

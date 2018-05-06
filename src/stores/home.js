import { decorate, observable, action } from 'mobx';
import request from './helpers/request';

const home = {
  latestBlogEntries: null,

  getLatestBlogEntries: async () => {
    home.latestBlogEntries = await request('/api/blog/latest');
  },
};

decorate(home, {
  latestBlogEntries: observable,
  getLatestBlogEntries: action,
});

export default home;

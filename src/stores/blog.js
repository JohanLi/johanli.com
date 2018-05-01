import { decorate, observable, action } from 'mobx';
import appInitialState from './helpers/app-initial-state';
import request from './helpers/request';

const blog = {
  blog: appInitialState.get('blog') || {
    latest: [],
    entries: [],
    archive: [],
    totalPages: 0,
  },

  getLatest: async () => {
    blog.blog.latest = await request('/api/blog/latest');
  },

  getPage: async (page) => {
    const { entries, totalPages } = await request(`/api/blog/${page}`);

    blog.blog.entries = entries;
    blog.blog.totalPages = totalPages;
  },

  getUrlKey: async (urlKey) => {
    blog.blog.entries = [await request(`/api/blog/${urlKey}`)];
  },

  getArchive: async (urlKey) => {
    blog.blog.archive = await request('/api/blog/archive');
  },
};

decorate(blog, {
  blog: observable,
  getLatest: action,
  getPage: action,
  getUrlKey: action,
  getArchive: action,
});

export default blog;

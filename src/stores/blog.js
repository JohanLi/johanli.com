import { decorate, observable, action } from 'mobx';
import { request } from './helpers';

const blog = {
  latest: [],
  entries: new Map(),
  pages: new Map(),
  archive: [],
  totalPages: 0,

  getLatest: async () => {
    blog.latest = await request('/api/blog/latest');
  },

  getPage: async (page) => {
    const { entries, totalPages } = await request(`/api/blog/${page}`);

    entries.forEach((entry) => {
      blog.entries.set(entry.url, entry);
    });

    blog.pages.set(page, entries.map(entry => entry.url));
    blog.totalPages = totalPages;
  },

  getUrlKey: async (urlKey) => {
    const entry = await request(`/api/blog/${urlKey}`);
    blog.entries.set(entry.url, entry);
  },

  getArchive: async (urlKey) => {
    blog.archive = await request('/api/blog/archive');
  },
};

decorate(blog, {
  latest: observable,
  entries: observable,
  pages: observable,
  archive: observable,
  totalPages: observable,
  getLatest: action,
  getPage: action,
  getUrlKey: action,
  getArchive: action,
});

export default blog;

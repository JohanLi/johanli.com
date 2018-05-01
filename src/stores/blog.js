import { decorate, observable, action } from 'mobx';
import initialState from './helpers/initial-state';
import request from './helpers/request';

const blog = {
  latestBlogEntries: initialState('latestBlogEntries'),
  blog: initialState('blog'),

  getLatest: async () => {
    blog.latestBlogEntries = await request('/api/blog/latest');
  },

  getPage: async (page) => {
    const [blogPage, archive] = await Promise.all([
      request(`/api/blog/${page}`),
      request('/api/blog/archive'),
    ]);

    blog.blog = {
      entries: blogPage.entries,
      totalPages: blogPage.totalPages,
      archive,
    };
  },

  getUrlKey: async (urlKey) => {
    const [entries, archive] = await Promise.all([
      request(`/api/blog/${urlKey}`),
      request('/api/blog/archive'),
    ]);

    blog.blog = {
      entries: [entries],
      totalPages: 0,
      archive,
    };
  },
};

decorate(blog, {
  latestBlogEntries: observable,
  blog: observable,
  getLatest: action,
  getPage: action,
  getUrlKey: action,
});

export default blog;

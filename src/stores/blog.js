import { decorate, observable, action } from 'mobx';
import initialState from './helpers/initial-state';
import request from './helpers/request';

const blogPageRequested = pageOrUrlKey => /^[0-9]+$/.test(pageOrUrlKey);

const blog = {
  latestBlogEntries: initialState('latestBlogEntries'),
  blog: initialState('blog'),
  current: null,

  getLatest: async () => {
    blog.latestBlogEntries = await request('/api/blog/latest');
  },

  get: (pageOrUrlKey) => {
    blog.current = pageOrUrlKey;

    if (blogPageRequested(pageOrUrlKey)) {
      blog.getPage(pageOrUrlKey);
    } else {
      blog.getUrlKey(pageOrUrlKey);
    }
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

  isLoading: (pageOrUrlKey) => {
    const initialExists = !blog.current;

    if (initialExists) {
      return false;
    }

    return blog.current !== pageOrUrlKey;
  }
};

decorate(blog, {
  latestBlogEntries: observable,
  blog: observable,
  getLatest: action,
  getPage: action,
  getUrlKey: action,
});

export default blog;

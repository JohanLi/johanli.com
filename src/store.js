import { decorate, observable, action } from 'mobx';

const store = {
  blogLatest: [],
  blog: {
    entries: new Map(),
    pages: new Map(),
    archive: [],
    totalPages: 0,
  },
  sideProjects: [],

  updateBlogLatest: async () => {
    store.blogLatest = await store.request('/api/blog/latest');
  },

  updateBlogPage: async (page) => {
    const { entries, totalPages } = await store.request(`/api/blog/${page}`);

    entries.forEach((entry) => {
      store.blog.entries.set(entry.url, entry);
    });

    store.blog.pages.set(page, entries.map(entry => entry.url));
    store.blog.totalPages = totalPages;
  },

  updateBlogUrlKey: async (urlKey) => {
    const entry = await store.request(`/api/blog/${urlKey}`);
    store.blog.entries.set(entry.url, entry);
  },

  updateBlogArchive: async (urlKey) => {
    store.blog.archive = await store.request('/api/blog/archive');
  },

  updateSideProjects: async () => {
    store.sideProjects = await store.request('/api/side-projects');
  },

  request: async (url) => {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });

    return response.json();
  },
};

decorate(store, {
  blogLatest: observable,
  blog: observable,
  updateBlogLatest: action,
  updateBlogPage: action,
  updateBlogUrlKey: action,
  updateBlogArchive: action,
  sideProjects: observable,
});

export default store;

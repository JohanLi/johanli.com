const store = {
  get: (key) => {
    if (store.isServer()) {
      return null;
    }

    return JSON.parse(localStorage.getItem(key));
  },

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
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

  isServer: () => typeof window === 'undefined',

  getBlog: () => store.get('blog'),

  updateBlog: async (pageOrUrlKey) => {
    const { entries, archive, totalPages } = await store.request(`/api/blog/${pageOrUrlKey}`);
    const updatedBlog = {
      entries: {},
      pages: {},
      archive,
      totalPages,
    };

    entries.forEach((entry) => {
      updatedBlog.entries[entry.url] = entry;
    });

    if (store.blogPageRequested(pageOrUrlKey)) {
      updatedBlog.pages[pageOrUrlKey] = entries.map(entry => entry.url);
    }

    const blog = store.getBlog();

    if (!blog) {
      store.set('blog', updatedBlog);
      return updatedBlog;
    }

    const mergedBlog = {
      entries: Object.assign(blog.entries, updatedBlog.entries),
      pages: Object.assign(blog.pages, updatedBlog.pages),
      archive: updatedBlog.archive,
      totalPages: updatedBlog.totalPages,
    };

    store.set('blog', mergedBlog);
    return mergedBlog;
  },

  blogPageRequested: pageOrUrlKey => !isNaN(pageOrUrlKey),

  getSideProjects: () => store.get('sideProjects'),

  updateSideProjects: async () => {
    const sideProjects = await store.request('/api/side-projects');
    store.set('sideProjects', sideProjects);

    return sideProjects;
  },
};

export default store;

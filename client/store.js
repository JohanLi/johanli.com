const store = {
  get: key => JSON.parse(localStorage.getItem(key)),

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

  getLatestBlogEntries: () => store.get(`blog/latest`) || [],

  updateLatestBlogEntries: async () => {
    const entries = await store.request('/api/blog/latest');
    store.set(`blog/latest`, entries);

    return entries;
  },

  getBlogPage: pageOrUrlKey => store.get(`blog/${pageOrUrlKey}`) || {
    entries: [],
    pagination: {},
  },

  updateBlogPage: async (pageOrUrlKey) => {
    const entries = await store.request(`/api/blog/${pageOrUrlKey}`);
    store.set(`blog/${pageOrUrlKey}`, entries);

    if (store.blogPageRequested(pageOrUrlKey)) {
      entries.entries.forEach((entry) => {
        store.set(`blog/${entry.url}`, {
          entries: [entry],
          archive: entries.archive,
        });
      });
    }

    return entries;
  },

  blogPageRequested: pageOrUrlKey => !isNaN(pageOrUrlKey),

  getBlogArchive: () => store.get('blogArchive') || [],

  updateBlogArchive: async () => {
    const blogArchive = await store.request('/api/blog/archive');
    store.set('blogArchive', blogArchive);

    return blogArchive;
  },

  getSideProjects: () => store.get('sideProjects') || [],

  updateSideProjects: async () => {
    const sideProjects = await store.request('/api/side-projects');
    store.set('sideProjects', sideProjects);

    return sideProjects;
  },
};

export default store;

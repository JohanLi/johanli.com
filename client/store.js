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

  getBlog: () => store.get('blog') || {
    entries: {},
    pages: {},
    pagination: {},
  },

  updateBlog: async (pageOrUrlKey) => {
    const { entries, pagination } = await store.request(`/api/blog/${pageOrUrlKey}`);
    const blog = store.getBlog();

    entries.forEach((entry) => {
      blog.entries[entry.url] = entry;
    });

    if (store.blogPageRequested(pageOrUrlKey)) {
      blog.pages[pageOrUrlKey] = entries.map(entry => entry.url);
    }

    blog.pagination = pagination;
    store.set('blog', blog);

    return blog;
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

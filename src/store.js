const store = {
  get: key => JSON.parse(localStorage.getItem(key)),

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  update: async (key) => {
    let url;
    let response;

    if (key === 'latestBlogEntries') {
      url = '/api/blog/latest';
    } else if (key === 'blogEntries') {
      url = '/api/blog';
    } else if (key === 'sideProjects') {
      url = '/api/side-projects';
    }

    try {
      response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      response = await response.json();
      store.set(key, response);
    } catch (error) {
      response = [];
    }

    return response;
  },
};

export default store;

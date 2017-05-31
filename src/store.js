const store = {
  get: key => JSON.parse(localStorage.getItem(key)),

  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  update: async (key) => {
    let response;

    try {
      response = await fetch(key, {
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

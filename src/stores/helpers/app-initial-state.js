let state = {};

const appInitialState = {
  new: () => {
    state = {};
  },

  get: (key) => {
    if (!key) {
      return state;
    }

    if (typeof window === 'undefined') {
      return state[key];
    } else {
      if (window.APP_INITIAL_STATE) {
        return window.APP_INITIAL_STATE[key];
      }

      return null;
    }
  },

  set: (key, value) => {
    state[key] = value;
  },
};

export default appInitialState;

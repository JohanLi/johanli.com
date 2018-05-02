const isServer = typeof window === 'undefined';

const initialState = (key) => {
  if (isServer) {
    return null;
  }

  if (!window.APP_INITIAL_STATE) {
    return null;
  }

  return window.APP_INITIAL_STATE[key];
};

export default initialState;

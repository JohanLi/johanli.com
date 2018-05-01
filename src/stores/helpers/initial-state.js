const isServer = typeof window === 'undefined';

const initialState = (key) => {
  if (isServer) {
    return;
  }

  if (!window.APP_INITIAL_STATE) {
    return;
  }

  return window.APP_INITIAL_STATE[key];
};

export default initialState;

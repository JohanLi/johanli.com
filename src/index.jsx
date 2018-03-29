import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

const render = (Component) => {
  const method = module.hot ? ReactDOM.render : ReactDOM.hydrate;

  method(
    <AppContainer>
      <BrowserRouter>
        <Component {...window.APP_INITIAL_STATE} />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}

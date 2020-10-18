import React from 'react';
import { render } from 'react-dom';
import './styles/index.css';
import * as Sentry from '@sentry/browser';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { config } from '_helpers/config';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

Sentry.init({ dsn: config.SentryDsn });

const store = configureStore({
  reducer: rootReducer,
});

export const history = createBrowserHistory();
const onRedirectCallback = (appState) => {
  history.replace(appState?.returnTo || window.location.pathname);
};

render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.Auth0.Domain ?? ''}
      clientId={config.Auth0.ClientId ?? ''}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

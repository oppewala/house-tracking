import React from 'react';
import { render } from 'react-dom';
import './styles/index.css';
import * as Sentry from '@sentry/browser';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { config } from './_helpers/config';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate';

Sentry.init({ dsn: config.SentryDsn });

const store = configureStore({
  reducer: rootReducer,
});

render(
  <React.StrictMode>
    <Auth0ProviderWithNavigate>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Auth0ProviderWithNavigate>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

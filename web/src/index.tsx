import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import * as Sentry from '@sentry/browser';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { config } from './_helpers/config';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate';
import PropertyReducers from '@/feature/Properties/PropertiesSlice';

Sentry.init({ dsn: config.SentryDsn });

const store = configureStore({
  reducer: {
    properties: PropertyReducers
  },
});

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

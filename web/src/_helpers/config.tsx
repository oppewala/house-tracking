const config = {
  GoogleApiKey: process.env.REACT_APP_GOOGLE_APIKEY,
  SentryDsn: process.env.REACT_APP_SENTRY_DSN,
  ApiRoot: process.env.REACT_APP_API_ROOT,
  Auth0: {
    Domain: process.env.REACT_APP_AUTH0_DOMAIN,
    ClientId: process.env.REACT_APP_AUTH0_CLIENTID,
  },
};

export { config };

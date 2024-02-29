const config = {
  GoogleApiKey: import.meta.env.VITE_GOOGLE_APIKEY,
  SentryDsn: import.meta.env.VITE_SENTRY_DSN,
  ApiRoot: import.meta.env.VITE_API_ROOT,
  Auth0: {
    Domain: import.meta.env.VITE_AUTH0_DOMAIN,
    ClientId: import.meta.env.VITE_AUTH0_CLIENTID,
  },
};

export { config };

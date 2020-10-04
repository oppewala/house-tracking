import * as React from 'react';

export const UserContext = React.createContext({
  isLoggedIn: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
});
UserContext.displayName = 'UserContext';

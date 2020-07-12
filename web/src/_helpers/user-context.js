import * as React from 'react';

export const UserContext = React.createContext({
  isLoggedIn: true,
  login: () => {},
  logout: () => {},
});
UserContext.displayName = 'UserContext';

import { config } from '../../_helpers/config';

const login = (username, password) => {
  const url = new URL('/users/login', config.ApiRoot);
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(url.toString(), request).then((user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  });
};

const logout = () => {
  localStorage.removeItem('currentUser');
};

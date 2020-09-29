const login = (username, password) => {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`api.house.crackedjar.com/users/login`, request).then((user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  });
};

const logout = () => {
  localStorage.removeItem('currentUser');
};

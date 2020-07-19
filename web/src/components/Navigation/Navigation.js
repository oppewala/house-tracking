import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '_helpers/user-context';

const useStyles = makeStyles((theme) => ({
  appBar: {},
  toolbar: {
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  title: {
    flexGrow: 1,
    textDecorationLine: 'none',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  login: {
    display: 'block',
  },
}));

function Navigation() {
  const classes = useStyles();

  return (
    <>
      <UserContext.Consumer>
        {({ isLoggedIn, login, logout }) => (
          <AppBar position="sticky" color="default" elevation={4} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography
                variant="h6"
                color="primary"
                noWrap
                className={classes.title}
                component={RouterLink}
                to="/"
              >
                House Trackr
              </Typography>
              <nav>
                <Link
                  variant="button"
                  color="textPrimary"
                  className={classes.link}
                  component={RouterLink}
                  to="/Budget"
                >
                  Budget
                </Link>
                <Link
                  variant="button"
                  color="textPrimary"
                  className={classes.link}
                  component={RouterLink}
                  to="/Properties"
                  hidden={!isLoggedIn}
                >
                  Properties
                </Link>
                <Link
                  variant="button"
                  color="textPrimary"
                  className={classes.link}
                  component={RouterLink}
                  to="/Resources"
                >
                  Resources
                </Link>
                <Button
                  onClick={login}
                  style={{
                    display: !isLoggedIn ? 'inline-flex' : 'none',
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={logout}
                  style={{
                    display: isLoggedIn ? 'inline-flex' : 'none',
                  }}
                >
                  Logout
                </Button>
              </nav>
            </Toolbar>
          </AppBar>
        )}
      </UserContext.Consumer>
    </>
  );
}

export default Navigation;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

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
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
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
              hidden={!isAuthenticated}
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
              onClick={() => loginWithRedirect()}
              style={{
                display: !isAuthenticated ? 'inline-flex' : 'none',
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => logout({ returnTo: window.location.origin })}
              style={{
                display: isAuthenticated ? 'inline-flex' : 'none',
              }}
            >
              Logout
            </Button>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;

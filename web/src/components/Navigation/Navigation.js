import React from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const PREFIX = 'Navigation';

const classes = {
  appBar: `${PREFIX}-appBar`,
  toolbar: `${PREFIX}-toolbar`,
  title: `${PREFIX}-title`,
  link: `${PREFIX}-link`,
  login: `${PREFIX}-login`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.appBar}`]: {},

  [`& .${classes.toolbar}`]: {
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
    textDecorationLine: 'none',
  },

  [`& .${classes.link}`]: {
    margin: theme.spacing(1, 1.5),
  },

  [`& .${classes.login}`]: {
    display: 'block',
  }
}));

function Navigation() {

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Root>
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
              underline="hover">
              Budget
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              className={classes.link}
              component={RouterLink}
              to="/Properties"
              hidden={!isAuthenticated}
              underline="hover">
              Properties
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              className={classes.link}
              component={RouterLink}
              to="/Resources"
              underline="hover">
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
    </Root>
  );
}

export default Navigation;

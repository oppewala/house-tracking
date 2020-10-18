import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { createMuiTheme, withStyles, CssBaseline, Box, ThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Budget from './feature/Finance/Budget';
import Properties from './feature/Properties/Properties';
import Navigation from './components/Navigation/Navigation';
import Resources from './feature/Resources/Resources';
import AuthRedirect from './components/AuthRedirect';

const htTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  mixins: {
    toolbar: {
      height: '64px',
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h3: 'h1',
        h4: 'h2',
        h5: 'h3',
        h6: 'h4',
      },
    },
  },
});

const styles = (theme) => ({
  root: {
    height: '100%',
    flex: 1,
    overflowX: 'hidden',
  },
  offset: theme.mixins.toolbar,
  content: {
    height: `calc(100vh - 64px)`, // Viewport - Header size
    // marginTop: theme.spacing(), // TODO: Why is this required?
  },
  footer: {
    position: 'fixed',
  },
});

const ProtectedRoute = ({ component, ...args }) => {
  const location = useLocation();

  return (
    <Route
      component={withAuthenticationRequired(component, {
        // eslint-disable-next-line react/display-name
        onRedirecting: () => <AuthRedirect />,
        returnTo: location.pathname,
      })}
      {...args}
    />
  );
};

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ThemeProvider theme={htTheme}>
        <CssBaseline />
        <Box className={classes.root}>
          <Navigation />
          <Box className={classes.content}>
            <Switch>
              <Route path="/Budget">
                <Budget />
              </Route>
              <ProtectedRoute path="/Properties" component={Properties} />
              <Route path="/Resources">
                <Resources />
              </Route>
              <Route path="/">
                <Budget />
              </Route>
            </Switch>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);

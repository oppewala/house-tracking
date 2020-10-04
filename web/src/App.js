import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, withStyles, CssBaseline, Box, ThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { UserContext } from './_helpers/user-context';
import Budget from './feature/Finance/Budget';
import Properties from './feature/Properties/Properties';
import Navigation from './components/Navigation/Navigation';
import Resources from './feature/Resources/Resources';

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.login = () => {
      localStorage.setItem('auth', 'fakejwt');
      this.setState((state) => ({
        ...state,
        userState: {
          ...state.userState,
          isLoggedIn: true,
        },
      }));
    };

    this.logout = () => {
      localStorage.removeItem('auth');
      this.setState((state) => ({
        ...state,
        userState: {
          ...state.userState,
          isLoggedIn: false,
        },
      }));
    };

    this.state = {
      userState: {
        isLoggedIn: localStorage.getItem('auth') || false,
        login: this.login,
        logout: this.logout,
      },
    };
  }

  render() {
    const { classes } = this.props;
    const { userState } = this.state;

    return (
      <ThemeProvider theme={htTheme}>
        <UserContext.Provider value={userState}>
          <CssBaseline />
          <Router>
            <Box className={classes.root}>
              <Navigation />
              <Box className={classes.content}>
                <Switch>
                  <Route path="/Budget">
                    <Budget />
                  </Route>
                  <Route path="/Properties">{userState.isLoggedIn ? <Properties /> : null}</Route>
                  <Route path="/Resources">
                    <Resources />
                  </Route>
                  <Route path="/">
                    <Budget />
                  </Route>
                </Switch>
              </Box>
            </Box>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
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
});

const useStyles = makeStyles((theme) => ({
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
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={htTheme}>
      <CssBaseline />
      <Router>
        <Box className={classes.root}>
          <Navigation />
          <Box className={classes.content}>
            <Switch>
              <Route path="/Budget">
                <Budget />
              </Route>
              <Route path="/Properties">
                <Properties />
              </Route>
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
    </ThemeProvider>
  );
}

export default App;

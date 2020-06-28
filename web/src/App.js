import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, Container, ThemeProvider } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Budget from './finance/Budget';
import Properties from './properties/Properties';
import Navigation from './Template/Navigation';
import Resources from './resources/Resources';

const htTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const useStyles = makeStyles(() => ({
  content: {},
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={htTheme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Container className={classes.content}>
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
        </Container>
        <footer>
          <div>House Tracker</div>
        </footer>
      </Router>
    </ThemeProvider>
  );
}

export default App;

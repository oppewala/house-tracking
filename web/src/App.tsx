import React from 'react';
import { adaptV4Theme } from '@mui/material/styles';
import { Route, Navigate } from 'react-router-dom';
import { withStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import { useAuth0 } from '@auth0/auth0-react';
import Budget from './feature/Finance/Budget';
import Properties from './feature/Properties/Properties';
import Navigation from './components/Navigation/Navigation';
import Resources from './feature/Resources/Resources';

const htTheme = createTheme(adaptV4Theme({
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
}));

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

interface AuthProps {
  children: JSX.Element;
  redirectTo: string;
}

const RequireAuth = ({ children, redirectTo }: AuthProps): JSX.Element  => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={htTheme}>
          <CssBaseline />
          <Box className={classes.root}>
            <Navigation />
            <Box className={classes.content}>
              <Route>
                <Route path="/" element={<Budget />} />
                <Route path="budget" element={<Budget />} />
                <Route path="resources" element={<Resources />} />
                <Route
                  path='properties'
                  element={
                    <RequireAuth redirectTo="login">
                      <Properties />
                    </RequireAuth>
                  }
                />
              </Route>
            </Box>
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }
}

export default withStyles(styles)(App);

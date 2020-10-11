import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    marginBottom: theme.spacing() * 3,
  },
  urlSelect: {
    width: '100%',
  },
}));

interface Crumb {
  route: string;
  name: string;
}

interface Props {
  crumbs: Crumb[];
}

export const BreadcrumbNav: React.FC<Props> = ({ crumbs, children }) => {
  const classes = useStyles();

  const crumbEls = crumbs.map((c) => {
    return (
      <>
        <Link variant="button" color="textPrimary" component={RouterLink} to={c.route}>
          {c.name}
        </Link>{' '}
        /{' '}
      </>
    );
  });

  return (
    <Typography variant="subtitle1" className={classes.breadcrumb}>
      {crumbEls} {children}
    </Typography>
  );
};

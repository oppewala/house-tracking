import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PREFIX = 'BreadcrumbNav';

const classes = {
  breadcrumb: `${PREFIX}-breadcrumb`,
  urlSelect: `${PREFIX}-urlSelect`
};

const StyledTypography = styled(Typography)((
  {
    theme
  }
) => ({
  [`&.${classes.breadcrumb}`]: {
    marginBottom: theme.spacing(3),
  },

  [`& .${classes.urlSelect}`]: {
    width: '100%',
  }
}));

interface Crumb {
  route: string;
  name: string;
}

interface Props {
  crumbs: Crumb[];
  children: JSX.Element;
}

export const BreadcrumbNav: React.FC<Props> = ({ crumbs, children }) => {


  const crumbEls = crumbs.map((c) => {
    return <>
      <Link
        variant="button"
        color="textPrimary"
        component={RouterLink}
        to={c.route}
        underline="hover">
        {c.name}
      </Link>{' '}
      /{' '}
    </>;
  });

  return (
    <StyledTypography variant="subtitle1" className={classes.breadcrumb}>
      {crumbEls} {children}
    </StyledTypography>
  );
};

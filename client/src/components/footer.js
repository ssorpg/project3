// COMPONENTS
import React from 'react';
import { Container, Typography, Link } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    height: '8vh',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer + " stick-to-bottom flex-middle flex-center"}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href={window.location.origin}>
            The Private Network
          </Link>{' '}
          {new Date().getFullYear()}
          {'. Built with '}
          <Link color="inherit" href="https://material-ui.com/">
            Material-UI.
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};

// COMPONENTS
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    height: '100px',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0)
  }
}));

export default function Copyright() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://theprivatenetwork.com/">
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
}
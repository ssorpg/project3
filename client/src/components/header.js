// COMPONENTS
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(4, 0, 6)
  }
}));

export default function Header({ pageTitle }) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {pageTitle}
        </Typography>
      </Container>
    </>
  );
}
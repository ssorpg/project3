// COMPONENTS
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Modal from './modal';
import Button from '@material-ui/core/Button';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  },

  form: {
    padding: theme.spacing(0, 0, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '350px'
  },

  textarea: {
    minWidth: '350px',
    minHeight: '100px',
    padding: '3px',
    resize: 'none',
    verticalAlign: 'bottom'
  },

  submit: {
    marginTop: '8px'
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

export default function PostDisplay({ handleSubmit, errorAlert, postTo }) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <main>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={4}
            className={classes.mainGrid}
          >
            <form className={classes.form} onSubmit={handleSubmit}>
              <textarea type="text" name="feed-comment" placeholder="What's on your mind?" className={classes.textarea} />
              <Button type="submit" value="submit" variant="contained" color="primary" className={classes.submit}>
                {
                  postTo ? `Post To ${postTo}` : 'Post'
                }
              </Button>
              {
                errorAlert ?
                  <Modal error={errorAlert} />
                  : ''
              }
            </form>
          </Grid>
        </main>
      </Container>
    </>
  );
}
// COMPONENTS
import React from 'react';
import { Paper, FormGroup, InputLabel,
  Input, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function NewCommunity({ handleCreateCommunitySubmit, toggleButtonClassName, handleFormChange }) {
  const useStyles = makeStyles( theme => ({
    root: {
      padding: '24px'
    },
    button: {
      display: 'block',
      verticalAlign: 'middle',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1.5)
    },
    input: {
      marginBottom: theme.spacing(5)
    }
  }));
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <form onSubmit={handleCreateCommunitySubmit}>
        <FormGroup>
          <InputLabel>
            <Typography variant="h5" gutterBottom>
              Enter Your Community Name
            </Typography>
          </InputLabel>
          <Input
            className={classes.input}
            type="text"
            name="community"
            placeholder="Awesome Community"
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            className={classes.button + toggleButtonClassName}
            variant="outlined"
            color="primary"
            onClick={handleFormChange}
            type="button"
          >
            Or Choose An Existing One!
          </Button>
        </FormGroup>
      </form>
    </Paper>
  );
}
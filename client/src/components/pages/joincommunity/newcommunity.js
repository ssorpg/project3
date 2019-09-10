// COMPONENTS
import React from 'react';
import { Paper, FormGroup, InputLabel, Input, Button, Typography, Checkbox, FormControlLabel } from '@material-ui/core';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  communityInput: {
    marginBottom: '24px'
  }
}));

export default function NewCommunity(props) {
  const { handleCreateCommunitySubmit, handleFormChange, makePrivate, handleMakePrivate } = props;
  
  const classes = useStyles();

  return (
    <Paper className="theme-paddingx2">
      <form onSubmit={handleCreateCommunitySubmit}>
        <FormGroup>
          <InputLabel>
            <Typography variant="h5" gutterBottom>
              Enter Your Community Name
            </Typography>
          </InputLabel>
          <Input
            className={classes.communityInput}
            type="text"
            name="community"
            placeholder="Awesome Community"
          />
          <Input
            className={classes.communityInput}
            type="text"
            name="bio"
            placeholder="Community bio"
          />
          <FormControlLabel
            control={<Checkbox checked={makePrivate} onChange={handleMakePrivate} />}
            label="Make Private"
          />
        </FormGroup>
        <Button
          className="inline-button"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="inline-button"
          variant="outlined"
          color="primary"
          onClick={handleFormChange}
        >
          Or Choose An Existing One!
        </Button>
      </form>
    </Paper>
  );
};

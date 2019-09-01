// COMPONENTS
import React from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  relative: {
    position: 'relative'
  }
}));

export default function UpdateForm({ bio, location, handleBioLocChange, handleBioLocSubmit }) {
  const classes = useStyles();

  return (
      <div className={classes.relative}>
        <form onSubmit={handleBioLocSubmit} className={classes.relative}>
          <TextField
            id="outlined-multiline-flexible"
            label="Bio"
            // multiline
            rowsMax="6"
            margin="normal"
            helperText="Tell me about yourself! What are your goals?! Hobbies?!"
            variant="outlined"
            name="bio"
            onChange={handleBioLocChange}
            value={bio ? bio : ''}
            autofocus
            required
          />
          <TextField
            id="outlined-name"
            label="Location"
            margin="normal"
            helperText="Where do you live?"
            variant="outlined"
            name="location"
            onChange={handleBioLocChange}
            value={location ? location : ''}
            required
          /><br />
          <Button variant="contained" color="primary" size="small" type="submit">
            <SaveIcon />
            Save
        </Button>
        </form>
      </div>
  )
}
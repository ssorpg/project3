// COMPONENTS
import React from 'react';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

export default function UpdateForm(props) {
  const { bio, location, handleBioLocChange, handleBioLocSubmit } = props;

  return (
      <div>
        <form onSubmit={handleBioLocSubmit}>
          <TextField
            id="outlined-multiline-flexible-bio"
            label="Bio"
            multiline
            rowsMax="6"
            margin="normal"
            helperText="Tell me about yourself! What are your goals?! Hobbies?!"
            variant="outlined"
            name="bio"
            onChange={handleBioLocChange}
            value={bio ? bio : ''}
            autoFocus
            required
          />
          <TextField
            id="outlined-location"
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
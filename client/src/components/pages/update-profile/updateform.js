// COMPONENTS
import React from 'react';
import Modal from '../../modal';
import TextField from '@material-ui/core/TextField';
// import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

export default function UpdateForm({ bio, location, onChange, handleSubmit, errorAlert }) {
  return (
    <div style={{ position: 'relative' }}>
      {
        errorAlert ?
          <Modal error={errorAlert} />
          : ''
      }
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <TextField
          id="outlined-multiline-flexible"
          label="Bio"
          rowsMax="6"
          margin="normal"
          helperText="Tell me about yourself! What are your goals?! Hobbies?!"
          variant="outlined"
          name="bio"
          onChange={onChange}
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
          onChange={onChange}
          value={location ? location : ''}
          required
        /><br />
        {/* <LoginButton /> */}
        <Button variant="contained" color="primary" size="small" type="submit">
          <SaveIcon />
          Save
      </Button>
      </form>
    </div>
  )
}
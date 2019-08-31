// COMPONENTS
import React from 'react';
import { Dialog, DialogTitle, TextField, Button } from '@material-ui/core';
import Modal from './modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inviteForm: {
    padding: theme.spacing(2),
    width: '450px',
    maxWidth: '74vw'
  },

  inviteButton: {
    marginTop: theme.spacing(1)
  }
}));

export default function InviteAUser({ handleInviteUser, dialogErrorAlert, inviteUserDialog, closeInviteDialog }) {
  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={inviteUserDialog}
      onClose={closeInviteDialog}
    >
      <DialogTitle id="simple-dialog-title">Invite A User</DialogTitle>
      <form onSubmit={handleInviteUser} className={classes.inviteForm}>
        <TextField
          label="Email"
          placeholder='someone@gmail.com'
          fullWidth
          required
          variant="outlined"
          name="email"
          autoComplete="email"
        />
        <Button
          type="submit"
          value="submit"
          variant="contained"
          color="primary"
          className={classes.inviteButton}
        >
          Invite
        </Button>
        {
          dialogErrorAlert ?
            <Modal error={dialogErrorAlert} />
            : ''
        }
      </form>
    </Dialog>
  );
};
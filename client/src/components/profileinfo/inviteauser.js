// COMPONENTS
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button } from '@material-ui/core';
import Modal from '../modal';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  inviteForm: {
    padding: '24px',
    paddingTop: 0,
    width: '450px',
    maxWidth: '70vw'
  },

  inviteButton: {
    marginTop: '12px'
  }
}));

export default function InviteAUser(props) {
  const { handleInviteUser, dialogAlert, inviteUserDialog, closeInviteDialog } = props;

  const classes = useStyles();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={inviteUserDialog}
      onClose={closeInviteDialog}
    >
      <DialogTitle id="simple-dialog-title" className="gray-divider">Invite A User</DialogTitle>
      <form onSubmit={handleInviteUser} className={classes.inviteForm}>
        <DialogContent>
          <DialogContentText id="simple-dialog-description">
            Enter the email address of someone you know to invite them to your community!
          </DialogContentText>
        </DialogContent>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
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
          dialogAlert ?
            dialogAlert.success ?
              <Modal success={dialogAlert.message} />
              : <Modal error={dialogAlert.message} />
            : ''
        }
      </form>
    </Dialog>
  );
};
// COMPONENTS
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function Confirmation(props) {
  const { color, buttonText, title, question, action } = props;

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function doAction() {
    action();

    handleClose();
  }

  return (
    <div>
      <Button size="small" color={color ? color : "secondary"} onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {
          title ?
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            : ''
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {question}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={doAction} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
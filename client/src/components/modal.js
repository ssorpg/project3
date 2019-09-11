// COMPONENTS
import React from 'react';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alert: {
    zIndex: '99',
    minWidth: '150px',
    cursor: 'pointer'
  },

  noMB: {
    marginBottom: 0
  }
}));

export default function Modal(props) {
  const { error, success } = props;
  
  const classes = useStyles();

  function dismissAlerts() { // dismiss error messages by clicking on them
    const errors = document.getElementsByClassName('alert');

    for (let i = 0; i < errors.length; i++) { // can't use foreach on a list :(
      errors[i].style.display = 'none'; // using .remove() breaks react because it can no longer find the node in the virtual DOM
    }
  }

  return (
    <div onClick={dismissAlerts} className={classes.alert + " no-margin alert"}>
      {
        error ?
          <div className={classes.noMB + " alert alert-danger"}>
            <strong>Error: </strong>
            {error}
          </div>
          : ''
      }
      {
        success ?
          <div className={classes.noMB + " alert alert-success"}>
            <strong>Success: </strong>
            {success}
          </div>
          : ''
      }
    </div>
  );
};

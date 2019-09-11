// COMPONENTS
import React from 'react';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  alert: {
    zIndex: '99',
    minWidth: '150px',
    cursor: 'pointer',
    position: 'fixed',
    //i gave up on the dialog component and was trying to vanilla CSS it here
    background: 'rgba(0,0,0,0.5)'
  },
  noMB: {
    marginBottom: 0,
  },
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
    <div onClick={dismissAlerts} className={classes.alert + " reset-margin alert"}>
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


// import React from 'react';
// import {
//   Button, Dialog, DialogActions,
//   DialogContent, DialogContentText,
//   DialogTitle, Slide
// } from '@material-ui/core';



// export default function Modal({ error, success }) {
//   const [open, setOpen] = React.useState(false);
//   React.useState(false);

//   const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

//   function handleOpen() {
//     setOpen(true);
//     console.log('is this working');
//   }

//   function handleClose() {
//     setOpen(false);
//     console.log('something');
//   }

//   return (
//     <div>
//       {
//         error ?
//           <>
//             <Dialog
//               //this line below doesn't work, open is a prop which takes only a boolean
//               open={open, handleOpen}
//               TransitionComponent={Transition}
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-slide-title"
//               aria-describedby="alert-dialog-slide-description"
//             >
//               <DialogTitle id="alert-dialog-slide-title">{"Error!"}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-slide-description">
//                   {error}
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                   Got it
//           </Button>
//               </DialogActions>
//             </Dialog>
//           </>
//           : ''
//       }
//       {
//         success ?
//           <>
//             <Dialog
//               open={handleOpen}
//               TransitionComponent={Transition}
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-slide-title"
//               aria-describedby="alert-dialog-slide-description"
//             >
//               <DialogTitle id="alert-dialog-slide-title">{"Success!"}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-slide-description">
//                   {success}
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose} color="primary">
//                   Got it
//           </Button>
//               </DialogActions>
//             </Dialog>
//           </>
//           : ''
//       }
//     </div>
//   );
// }
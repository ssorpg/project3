// COMPONENTS
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
// import findphoto from '../../../utils/getprofileimage';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  msg: {
    wordBreak: 'break-all',
    maxWidth: '95vw'
  }
}));

export default function ChatMessage({ name, message, user, time }) {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="qtpie" src={user.profileImage[0].filename? `/images/${user.profileImage[0].filename}`:'https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png'} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                <p className={classes.msg}>{time + ': ' + message}</p>
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
}






// export default function AlignItemsList() {
//   const classes = useStyles();

//   return (
//     <List className={classes.root}>
      // <ListItem alignItems="flex-start">
      //   <ListItemAvatar>
      //     <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      //   </ListItemAvatar>
      //   <ListItemText
      //     primary="Brunch this weekend?"
      //     secondary={
      //       <React.Fragment>
      //         <Typography
      //           component="span"
      //           variant="body2"
      //           className={classes.inline}
      //           color="textPrimary"
      //         >
      //           Ali Connors
      //         </Typography>
      //         {" — I'll be in your neighborhood doing errands this…"}
      //       </React.Fragment>
      //     }
      //   />
      // </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography>
//               {" — Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
      // <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Oui Oui"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 component="span"
//                 variant="body2"
//                 className={classes.inline}
//                 color="textPrimary"
//               >
//                 Sandra Adams
//               </Typography>
//               {' — Do you have Paris recommendations? Have you ever…'}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>
//   );
// }

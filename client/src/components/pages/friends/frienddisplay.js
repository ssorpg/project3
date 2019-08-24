// // COMPONENTS
// import React from 'react';
// import { Col } from 'react-bootstrap';
// import Card from '../../card.js';
// import Profilephoto from '../../profilephoto';

// export default function Friend({ friend, CommunityId }) {
//   return (
//     <Col xs={6} sm={4} lg={2} style={{ minWidth: '200px' }}>
//       <a href={`/community/${CommunityId}/friends/${friend.id}`}>
//         <Card cardClass="text-dark text-left card">
//           <nav className="card-nav">
//             {/* <button class="btn btn-default" className="favorite"></button> */}
//             {/* <button class="btn btn-default" className="select"></button> */}
//           </nav>
//           <Profilephoto id={friend.id} />
//           <div class="card-body">
//             <h5 className="card-title">{friend.name}</h5>
//           </div>
//         </Card>
//       </a>
//     </Col>
//   )
// }

// COMPONENTS
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Friend from './friend'

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

export default function FriendDisplay({ YourId, CommunityId, friends }) {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="lg">
        <main>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={4}
            className={classes.mainGrid}
          >
            {
              friends ?
              friends.map(friend => (
                  <Grid item xs={4} sm={3} md={2}>
                    <Friend
                      YourId={YourId}
                      CommunityId={CommunityId}
                      friend={friend}
                    />
                  </Grid>
                ))
                : ''
            }
          </Grid>
        </main>
      </Container>
    </>
  );
}
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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';
import GetProfileImage from '../../../utils/getprofileimage';

const useStyles = makeStyles({
  media: {
    paddingTop: '56.25%' // 16:9
  }
});

export default function MediaCard({ YourId, CommunityId, friend }) {
  const classes = useStyles();

  function goToFriend() {
    const goTo = YourId === friend.id ?
      `/profile`
      : `/community/${CommunityId}/users/${friend.id}/wall`

    window.location = goTo;
  }

  return (
    <Card>
      <CardActionArea onClick={goToFriend}>
        <CardMedia
          className={classes.media}
          image={GetProfileImage(friend)}
          title="Profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {friend.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

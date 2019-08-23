// // COMPONENTS
// import React from 'react';
// import { Row, Col } from 'react-bootstrap';
// import Card from './card.js';
// import Profilephoto from './profilephoto';
// import CommentOnPosts from './commentOnPosts';

// export default function Post(props) {
//   const { YourId, post, vote, /*addComment,*/ editPost, deletePost } = props;
//   return (
//     <Col key={post.id} id={`post${post.id}`} md={12} lg={6} style={{ padding: '15px' }}>
//       <div className="comment">
//         <Card cardClass={"text-dark text-left card"}>
//           <a
//             style={{ maxWidth: '50%' }}
//             href=
//             {
//               YourId === post.author.id ?
//                 `/profile`
//                 : `/community/${post.CommunityId}/friends/${post.author.id}`
//             }
//           >
//             <h4 className="username" style={{ margin: '10px' }}>
//               {post.author.name}
//             </h4>
//           </a>
//           <Row className="justify-content-center" style={{ width: '100%', margin: 0 }}>
//             <Col xs={6} sm={5} md={4} lg={5} xl={4}>
//               <a
//                 href=
//                 {
//                   YourId === post.author.id ?
//                     `/profile`
//                     : `/community/${post.CommunityId}/friends/${post.author.id}`
//                 }
//               >
//                 <figure className="float:right" style={{ overflow: 'hidden' }}>
//                   <Profilephoto id={post.authorId} />
//                 </figure>
//               </a>
//             </Col>
//             <Col xs={6} sm={7} md={8} lg={7} xl={8} style={{ minHeight: '100px' }}>
//               <p className="comment">{post.message}</p>
//             </Col>
//             <Col className="col-12 justify-content-end">
//               <ul style={{ margin: 0, textAlign: 'right' }}>
//                 <li className="btn" style={{ padding: '2px' }}>
//                   <button className="btn btn-success" onClick={vote} data-id={post.id} data-vote={"like"}>Like</button>
//                 </li>
//                 <li className="btn" style={{ padding: '2px', marginRight: '5px' }}>
//                   <button className="btn btn-danger" onClick={vote} data-id={post.id} data-vote={"dislike"}>Dislike</button>
//                 </li>
//                 {
//                   YourId === post.author.id ?
//                     <li className="btn" style={{ padding: '2px', marginRight: '5px' }}>
//                       <button className="btn btn-danger" onClick={editPost} data-id={post.id} >Edit</button>
//                     </li>
//                     : ''
//                 }
//                 {
//                   YourId === post.author.id ?
//                     <li className="btn" style={{ padding: '2px', marginRight: '5px' }}>
//                       <button className="btn btn-danger" onClick={deletePost} data-id={post.id}>Delete</button>
//                     </li>
//                     : ''
//                 }
//               </ul>
//             </Col>
//             <div style={{ position: 'absolute', top: '5px', right: '10px' }}>
//               <h6 id={'postScore' + post.id}>Score: {post.score}</h6>
//             </div>
//           </Row>
//           <CommentOnPosts
//             data={post}
//           />
//         </Card>
//       </div>
//     </Col>
//   )
// }

// COMPONENTS
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CommentOnPosts from './commentOnPosts';

// FUNCTIONS
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

export default function MediaCard({ YourId, post, vote, deletePost }) {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={vote} data-id={post.id} data-vote={"like"}>
          Like
        </Button>
        <Button size="small" color="secondary" onClick={vote} data-id={post.id} data-vote={"dislike"}>
          Dislike
        </Button>
        {
          YourId === post.author.id ?
            <Button size="small" color="secondary" onClick={deletePost}>
              Delete
            </Button>
            : ''
        }
      </CardActions>
      <CommentOnPosts
        data={post}
      />
    </Card>
  );
}

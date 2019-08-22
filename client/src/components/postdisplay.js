// COMPONENTS
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Post from './post';

// FUNCTIONS
import ax from 'axios';
import GetUserId from '../utils/getuserid';

export default class PostDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserId: GetUserId()
    }
  }

  vote = async event => {
    const post = event.target;
    console.log(post);
    try {
      const newScore = await ax.put(`/api/posts/${event.target.dataset.id}/${event.target.dataset.vote}`);

      document.getElementById('postScore' + post.dataset.id).textContent = 'Score: ' + newScore.data;
    }
    catch (error) {
      console.log(error.response);
    }
  }

  deletePost = async event => {
    // console.log(event.target);
    // console.log(event.target.parentNode);
    document.getElementById(this.props.posts[0].id).remove();
    
    try {
      await ax.delete(`/api/posts/${event.target.dataset.id}/`);
    } catch (error) {
      console.log(error.response);
    }
  }

  editPost = async event => {
    console.log(event.target);
    //we want something to pop up that will allow user to edit the post.. but my brain fried.
    try {
      await ax.put(`/api/posts/${event.target.dataset.id}/`);
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <Row style={{ textAlign: 'center', margin: 'auto' }}>
        {
          this.props.posts
            ? this.props.posts.map(post => (
              <Post
                UserId={this.state.UserId}
                post={post}
                vote={this.vote}
                deletePost={this.deletePost}
                // addComment={this.addComment}
                editPost={this.editPost}
              />
            ))
            : <h2 className="col-12">No posts here.<br />You should make one!</h2>
        }
      </Row>
    )
  }
}
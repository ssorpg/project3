// COMPONENTS
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Post from './post';

// FUNCTIONS
import ax from 'axios';
import GetYourId from '../utils/getyourid';

export default class PostDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      YourId: GetYourId()
    }
  }

  vote = async event => {
    const post = event.target;

    try {
      const newScore = await ax.put(`/api/posts/${post.dataset.id}/${post.dataset.vote}`);

      document.getElementById(`postScore${post.dataset.id}`).textContent = 'Score: ' + newScore.data;
    }
    catch (error) {
      console.log(error.response);
    }
  }

  deletePost = async event => {
    const post = document.getElementById(`post${event.target.dataset.id}`);
    post.style.display = 'none'; // can't delete elements, it causes a react error

    try {
      await ax.delete(`/api/posts/${event.target.dataset.id}/`);
    }
    catch (error) {
      console.log(error.response);
    }
  }

  editPost = async event => {
    console.log(event.target);

    // we want something to pop up that will allow user to edit the post.. but my brain fried.

    try {
      await ax.put(`/api/posts/${event.target.dataset.id}/`);
    }
    catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <Row style={{ textAlign: 'center', margin: 'auto' }}>
        {
          this.props.posts ?
            this.props.posts.map(post => (
              <Post
                key={post.id}
                YourId={this.state.YourId}
                post={post}
                vote={this.vote}
                deletePost={this.deletePost}
                editPost={this.editPost}
              />
            ))
            : <h2 className="col-12">No posts here.<br />You should make one!</h2>
        }
      </Row>
    )
  }
}
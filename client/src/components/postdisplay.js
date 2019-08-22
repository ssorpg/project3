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

    try {
      const newScore = await ax.put(`/api/posts/${event.target.dataset.id}/${event.target.dataset.vote}`);

      document.getElementById('postScore' + post.dataset.id).textContent = 'Score: ' + newScore.data;
    }
    catch (error) {
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
                addComment={this.addComment}
              />
            ))
            : <h2 className="col-12">No posts here.<br />You should make one!</h2>
        }
      </Row>
    )
  }
}
// COMPONENTS
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PostDisplay from '../../postdisplay';
import Modal from '../../modal';

// IMAGES
import './images/icons/svg/star-empty.svg';
import './images/icons/svg/star-full.svg';
import './images/icons/svg/check-empty.svg';
import './images/icons/svg/check-full.svg';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      CommunityId: this.props.match.params.CommunityId,
      pageTitle: undefined,
      posts: undefined,
      errorAlert: undefined
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get(`/api/communities/${this.state.CommunityId}`);

      this.setState({
        pageTitle: res.data.name,
        posts: res.data.feedPosts
      });
    }
    catch (error) {
      CheckError(error);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('textarea')[0];
    const message = input.value;

    const post = {
      message: message
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(post);
    submit.style.visibility = 'visible';
  }

  postToDB = async data => {
    this.setState({ errorAlert: undefined });

    try {
      const res = await ax.post(`/api/posts?CommunityId=${this.state.CommunityId}`, data);

      this.setState({
        posts: [res.data, ...this.state.posts]
      });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <Container style={{ textAlign: 'center' }}>
        <Row>
          <Col>
            <h1>{this.state.pageTitle}</h1>
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <form
              className="form-group"
              onSubmit={this.handleSubmit}
            >
              {
                this.state.errorAlert ?
                  <Modal error={this.state.errorAlert} />
                  : ''
              }
              <textarea type="text" name="feed-comment" placeholder="What's on your mind?" style={{ minWidth: '350px', minHeight: '100px', padding: '3px', resize: 'none', verticalAlign: 'bottom' }} />
              <button type="submit" value="submit" className="btn btn-primary" style={{ marginLeft: '15px', marginTop: '-80px' }}>Post to Feed</button>
            </form>
          </Col>
        </Row>
        <PostDisplay
          posts={this.state.posts}
        />
      </Container>
    );
  }
}
// COMPONENTS
import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from '../../card.js';
import ProfileInfo from '../../profileinfo';
import PostDisplay from '../../postdisplay';
import Modal from '../../modal';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Wall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CommunityId: parseInt(props.match.params.CommunityId),
      UserId: parseInt(props.match.params.UserId),
      userData: undefined,
      posts: undefined,
      errorAlert: undefined
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/communities/${this.state.CommunityId}/users/${this.state.UserId}/wall`);

      this.setState({
        userData: userData,
        posts: userData.data.wallPosts
      });
    }
    catch (error) {
      if (error.response.status === 400) {
        return window.location = '/profile';
      }

      CheckError(error);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;

    const input = form.getElementsByTagName('textarea')[0];
    const post = {
      message: input.value
    };

    const submit = form.getElementsByTagName('button')[0];

    submit.style.visibility = 'hidden';
    await this.postToDB(post);
    submit.style.visibility = 'visible';
  }

  postToDB = async data => {
    this.setState({ errorAlert: undefined });

    try {
      const res = await ax.post(`/api/posts?CommunityId=` + this.state.CommunityId + `&UserId=` + this.state.UserId, data);

      this.setState({ posts: [res.data, ...this.state.posts] });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ errorAlert: error.response.data });
    }
  }

  render() {
    return (
      <div>
        <Card className="text-dark text-left col-12 card" style={{ border: 'none' }}>
          <ProfileInfo
            userData={this.state.userData}
          />
          <Container style={{ textAlign: 'center', padding: '15px' }}>
            <Row style={{ textAlign: 'center' }}>
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
                  <button type="submit" value="submit" className="btn btn-primary" style={{ marginLeft: '15px', marginTop: '-80px' }}>Post to Wall</button>
                </form>
              </Col>
            </Row>
            <PostDisplay
              posts={this.state.posts}
            />
          </Container>
        </Card>
      </div>
    )
  }
}

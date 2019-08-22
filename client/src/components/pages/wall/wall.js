// COMPONENTS
import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Card from '../../card.js';
import ProfileInfo from '../../profileinfo';
import PostDisplay from '../../postdisplay';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../../../utils/checkerror';

export default class Wall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: undefined,
      posts: undefined,
      UserId: parseInt(props.match.params.UserId),
      CommunityId: parseInt(props.match.params.CommunityId)
    };
  }

  componentDidMount() {
    this.GetData();
  }

  GetData = async () => {
    try {
      const userData = await ax.get(`/api/communities/` + this.state.CommunityId + `/users/` + this.state.UserId + `/wall`);

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

    const submit = form.getElementsByTagName('button')[0];
    submit.style.visibility = 'hidden';

    const input = form.getElementsByTagName('input')[0];
    const post = {
      message: input.value
    };

    await this.postToDB(post);
    submit.style.visibility = 'visible';
  }

  postToDB = async data => {
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
                      <div className="alert alert-danger">
                        <p>
                          <strong>Error: </strong>
                          {this.state.errorAlert}
                        </p>
                      </div>
                      : ''
                  }
                  <input type="text" name="feed-comment" placeholder="What's on your mind?" style={{ minWidth: '310px', padding: '3px' }} />
                  <button type="submit" value="submit" className="btn btn-primary" style={{ margin: '15px', marginTop: '10px' }}>Post</button>
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

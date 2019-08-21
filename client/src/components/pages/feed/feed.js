// COMPONENTS
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PostDisplay from '../../postdisplay';

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
      communityData: undefined,
      posts: undefined
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get('/api/communities/' + this.state.CommunityId);

      await this.setState({
        pageTitle: res.data.name,
        communityData: res.data,
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
    this.setState({ errorAlert: undefined });

    try {
      const res = await ax.post(`/api/posts?CommunityId=` + this.state.CommunityId, data);

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
                  <div className="alert alert-danger">
                    <p>
                      <strong>Error: </strong>
                      {this.state.errorAlert}
                    </p>
                  </div>
                  : ''
              }
              <input type="text" name="feed-comment" placeholder="What's on your mind?" style={{ minWidth: '310px', padding: '3px' }} />
              <button type="submit" value="submit" className="btn btn-primary" style={{ margin: '15px' }}>Post</button>
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
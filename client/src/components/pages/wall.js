import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';
import OtherPhoto from '../otherphoto';
import CheckError from '../../utils/checkerror';

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
      const userData = this.state.UserId // TODO make your wall your profile page
        ? await ax.get(`/api/communities/${this.state.CommunityId}/users/${this.state.UserId}/wall`) // someone else's wall
        : await ax.get(`/api/communities/${this.state.CommunityId}/wall`); // your wall

      this.setState({
        userData: userData,
        posts: userData.data.wallPosts
      });
    }
    catch (error) {
      if (error.response.status === 400) {
        return window.location = '/community/' + this.state.CommunityId + '/wall';
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
      const res = await ax.post(`/api/posts?CommunityId=` + this.props.match.params.CommunityId + `&UserId=` + this.props.match.params.UserId, data);

      this.setState({ posts: [res.data, ...this.state.posts] });
    }
    catch (error) {
      console.log('Error Posting: ', error.response);
      this.setState({ error_alert: error.response.data });
    }
  }

  render() {
    return (
      <div>
        {
          this.state.userData ?
            <Card cardClass={"text-dark text-left col-12 card"}>
              <div className="row justify-content-start">
                <img className="card-img-top col-2" src="http://place-hold.it/200" alt="" style={{ height: '200px', minWidth: '200px', padding: '20px' }} />
                <header className="col-5" style={{ paddingTop: '20px' }}>
                  <h5 className="card-title">
                    {this.state.userData.data.name}
                  </h5>
                </header>
              </div>
              <div className="card-body">
                <p className="card-text">
                  {this.state.userData.data.bio}
                </p>
                {
                  this.state.UserId
                    ? <Row>
                      <Col className="col-12" style={{ textAlign: 'center' }}>
                        <form
                          className="form-group"
                          onSubmit={this.handleSubmit}
                        >
                          <input type="text" name="feed-comment" placeholder={"Say something!"} style={{ minWidth: '310px' }} />
                          <button type="submit" value="submit" className="btn btn-primary" style={{ margin: '15px' }}>Post</button>
                        </form>
                      </Col>
                    </Row>
                    : ''
                }
                <Row>
                  {
                    this.state.posts
                      ? this.state.posts.map(post => (
                        <Col key={post.id.toString()} md={12} lg={6} style={{ padding: '15px' }}>
                          <div className="comment">
                            <Card cardClass={"text-dark text-left card"}>
                              <a href={"/community/" + this.state.CommunityId + "/friends/" + post.author.id}>
                                <h4 className="username" style={{ margin: '10px' }}>
                                  {post.author.name}
                                </h4>
                              </a>
                              <Row className="justify-content-center">
                                <a href={"/community/" + this.state.CommunityId + "/friends/" + post.author.id}>
                                  <Col className="col-3">
                                    <figure className="float:right"
                                      style={{
                                        borderRadius: '150px',
                                        overflow: 'hidden'
                                      }}>
                                      <OtherPhoto id={post.authorId} />
                                    </figure>
                                  </Col>
                                </a>
                                <Col className="col-8" style={{ minHeight: '100px' }}>
                                  <p className="comment">{post.message}</p>
                                  <ul style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                                    <li className="btn" style={{ padding: '2px' }}>
                                      <button className="btn btn-success" onClick={this.vote} data-id={post.id} data-vote={"1"}>Like</button>
                                    </li>
                                    <li className="btn" style={{ padding: '2px' }}>
                                      <button className="btn btn-danger" onClick={this.vote} data-id={post.id} data-vote={"-1"}>Dislike</button>
                                    </li>
                                    <li className="btn" style={{ padding: '2px' }}>
                                      <button className="btn btn-primary" onClick={this.addComment} data-id={post.id}>Comment</button>
                                    </li>
                                  </ul>
                                </Col>
                              </Row>
                            </Card>
                          </div>
                        </Col>
                      ))
                      : <h2>No posts on their wall. <br /> You should make one!</h2>
                  }
                </Row>
              </div>
            </Card>
            : ''
        }
      </div>
    )
  }
}

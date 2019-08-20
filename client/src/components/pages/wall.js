import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';
import ImageUpload from '../imageupload';

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
      if (this.state.UserId) { // someone else's wall
        const userData = await ax.get(`/api/communities/${this.state.CommunityId}/users/${this.state.UserId}/wall`);
        this.setState({
          userData: userData,
          posts: userData.data.wallPosts
        });
      }
      else { // your wall
        const userData = await ax.get(`/api/communities/${this.state.CommunityId}/wall`);
        this.setState({
          userData: userData,
          posts: userData.data.wallPosts
        });
      }
    }
    catch (error) {
      console.log(error.response);
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
                <Row>
                  {
                    this.state.posts
                      ? this.state.posts.map(post => (
                        <Col key={post.id.toString()} md={12} lg={6} style={{ padding: '15px' }}>
                          <div className="comment">
                            <Card cardClass={"text-dark text-left card"}>
                              <h4 className="username" style={{ margin: '10px' }}>
                                {post.author.name}
                              </h4>
                              <Row className="justify-content-center">
                                <Col className="col-3">
                                  <figure className="float:right"
                                    style={{
                                      borderRadius: '150px',
                                      overflow: 'hidden'
                                    }}>
                                    <img src="http://place-hold.it/150" alt="of a guy" style={{ maxWidth: '100%' }} />
                                  </figure>
                                </Col>
                                <Col className="col-8">
                                  <p className="comment">{post.message}</p>
                                  <ul style={{ padding: 0, position: 'absolute', bottom: '5px', marginBottom: 0 }}>
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
                      : <h2>No posts on their wall. <br /> You should make some!</h2>
                  }
                </Row>
              </div>
            </Card>
            : ''
        }
        <ImageUpload />
      </div>
    )
  }
}

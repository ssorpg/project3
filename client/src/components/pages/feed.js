import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../card.js';
import './images/icons/svg/star-empty.svg';
import './images/icons/svg/star-full.svg';
import './images/icons/svg/check-empty.svg';
import './images/icons/svg/check-full.svg';
import ax from 'axios';

export default class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      community: undefined
    }
  }

  componentDidMount() {
    this.GetData(this.props);
  }

  GetData = async props => {
    try {
      const community = await ax.get('/api/communities/' + props.match.params.CommunityId);

      console.log(community);
      this.setState({ community: community });
    }
    catch (error) {
      console.log(error.response);
    }

  }

  render() {
    return (
      <Container>
        {
          this.state.community ?
            <div>
              <Row>
                <Col>
                  <h1>The Network Feed</h1>
                </Col>
              </Row>
              <Row>
                <Col className="col-12">
                  <form className="form-group">
                    <input type="text" name="feed-comment" placeholder="Tell the community what you're thinking…" />
                    <button type="submit" value="submit" className="btn btn-primary">Submit</button>
                  </form>
                </Col>
              </Row>
              <Row>
                {
                  this.state.community.data.feedPosts
                    ? this.state.community.data.feedPosts.map((post, id) => (
                      <Col key={id} xs={12} md={6} style={{ padding: '10px' }}>
                        <div className="comment">
                          <Card cardClass={"text-dark text-left card"}>
                            <h4 className="username">{post.title}</h4>
                            <Row>
                              <Col className="col-3">
                                <figure className="float:right"
                                  style={{
                                    borderRadius: '150px',
                                    overflow: 'hidden'
                                  }}>
                                  <img src="http://place-hold.it/150" alt="of a guy" style={{ maxWidth: '100%' }} />
                                </figure>
                              </Col>
                              <Col className="col-9">
                                <p className="comment">{post.message}</p>
                                <ul style={{ padding: 0 }}>
                                  <li className="btn btn-like" style={{ paddingLeft: 0 }}>
                                    {/* these routes don't actually work as href, they need to be axios requests */}
                                    <a href={"/api/posts/" + post.id + "/1"}>Like</a>
                                  </li>
                                  <li className="btn btn-dislike">
                                    <a href={"/api/posts/" + post.id + "/-1"}>Dislike</a>
                                  </li>
                                  <li className="btn btn-comment">
                                    <a href={"/api/posts/" + post.id + "/comments"}>Comment</a>
                                  </li>
                                </ul>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      </Col>
                    ))
                    : ''
                }
              </Row>
            </div>
            : ''
        }
      </Container>
    );
  }
}
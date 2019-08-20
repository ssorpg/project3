import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../card.js';
import './images/icons/svg/star-empty.svg';
import './images/icons/svg/star-full.svg';
import './images/icons/svg/check-empty.svg';
import './images/icons/svg/check-full.svg';
import OtherPhoto from '../otherphoto';
import ax from 'axios';
import CheckError from '../../utils/checkerror';

export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      communityData: {},
      posts: [],
      error_alert: undefined
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get('/api/communities/' + this.props.match.params.CommunityId);

      await this.setState({
        pageTitle: res.data.name,
        communityData: res.data,
        posts: res.data.feedPosts
      });
      console.log(this.state.posts);
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

    const input = form.getElementsByTagName('input[name=feed-comment]');
    const post = {
      message: input.value
    };

    await this.postToDB(post);
    submit.style.visibility = 'visible';
  }

  postToDB = async data => {
    this.setState({ error_alert: undefined });

    try {
      const res = await ax.post(`/api/posts?CommunityId=` + this.props.match.params.CommunityId, data);

      this.setState({
        posts: [res.data, ...this.state.posts]
      });
    }
    catch (error) {
      console.log(error.response);
      this.setState({ error_alert: error.response.data });
    }
  }

  vote = async event => {
    this.setState({ error_alert: undefined });

    try {
      await ax.put(`/api/posts/${event.target.dataset.id}/${event.target.dataset.vote}`);
    }
    catch (error) {
      console.log(error.response);
      this.setState({ error_alert: error.response.data });
    }
  }

  render() {
    return (
      <Container>
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
                this.state.error_alert ?
                  <div className="alert alert-danger">
                    <p>
                      <strong>Error: </strong>
                      {this.state.error_alert}
                    </p>
                  </div>
                  : ''
              }
              <input type="text" name="feed-comment" placeholder="Tell the community what you're thinking…" style={{ minWidth: '310px' }} />
              <button type="submit" value="submit" className="btn btn-primary" style={{ margin: '15px' }}>Post</button>
            </form>
          </Col>
        </Row>
        <Row>
          {
            this.state.posts
              ? this.state.posts.map(post=> (
                
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
                            <OtherPhoto id={post.authorId}/>
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
              : <h2>No posts in this community. <br /> You should make one!</h2>
          }
        </Row>
      </Container>
    );
  }
}
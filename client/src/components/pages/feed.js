import React, {Component} from 'react';
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
    const cookies = document.cookie.split(';');
    const userId = cookies[1].split('=')[1];

    this.state = {
      communityData: {},
      postsData: [],
      success_alert: undefined,
      error_alert: undefined,
      userId: userId
    }
  }
  
  componentWillMount(props) {
    this.getData(props);
  }

  getData = async () => {
    try {
      let res = await ax.get('/api/communities/2'); 

      this.setState({
        pageTitle: res.data.name,
        communityData: res.data,
        posts: res.data.feedPosts
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    let formData = event.target;
    let inputs = formData.getElementsByTagName('input');

    let post = {
      title: 'A New Comment!',
      AuthorId: this.state.userId,
      message: inputs[0].value,
     score: 0
    };

    this.postToDB(post);
}
  
postToDB = async (data) => {
    try {
      var res = await ax.post(`/api/posts?CommunityId=2&UserId=${this.state.userId}`, data);

      this.setState({
        success_alert : 'You have posted.'
      });
    } catch (error) {
      console.log('Error Posting: ', error.response);
      this.setState({
        error_alert : error.response.data
      });
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
              {this.state.success_alert ?
                <div className="alert alert-success">
                  <p>
                  <strong>Success: </strong>
                  {this.state.success_alert}
                  </p>
                </div>
              : 
                ''
              }

              {this.state.error_alert ?  
                <div className="alert alert-danger">
                  <p>
                  <strong>Error: </strong>
                  {this.state.error_alert}
                  </p>
                </div>
              :
                ''
              }
              <input type="text" name="feed-comment" placeholder="Tell the community what you're thinking…" />
              <button type="submit" value="submit" className="btn btn-primary">Submit</button>
            </form>
          </Col>
        </Row>
        <Row>
          {this.state.posts !== undefined ? 
            this.state.posts.map((item) => (
              <Col key={item.id.toString()} xs={12} md={6} style={{ padding: '10px' }}>

                <div className="comment">
                  <Card cardClass={"text-dark text-left card"}>
                    <h4 className="username">
                      {item.name}
                    </h4>
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
                        <p className="comment">{item.message}</p>
                        <ul style={{ padding: 0 }}>
                          <li className="btn btn-like" style={{ paddingLeft: 0 }}>
                            <a href="#">Like</a>
                          </li>
                          <li className="btn btn-dislike">
                            <a href="#">Dislike</a>
                          </li>
                          <li className="btn btn-comment">
                            <a href="#">Comment</a>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </Col>
            ))
          :
          <h2>No Comments Found. <br /> You should make some!</h2>
          }
        </Row>
      </Container>
    );
  }
}
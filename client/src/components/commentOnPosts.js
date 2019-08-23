// COMPONENTS
import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import CommentDisplay from './commentdisplay';

// FUNCTIONS
import ax from 'axios';
import CheckError from '../utils/checkerror';

export default class CommentOnPosts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: undefined
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const res = await ax.get(`/api/posts/${this.props.data.id}/comments`);

      this.setState({
        comments: res.data.comments
      })
      //console.log('RESPONSE get', res.data.comments);
    }
    catch (error) {
      CheckError(error);
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const form = event.target;

    const input = form.getElementsByTagName('input')[0];
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
      const res = await ax.post(`/api/posts/${this.props.data.id}/comments`, data);

      this.setState({
        comments: [res.data, ...this.state.comments]
      });
      // console.log('data', data);
      // console.log('response post??', res.data);
    }
    catch (error) {
      // console.log(error.response);
      // this.setState({ errorAlert: error.response.data });
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
              <input type="text" name="feed-comment" placeholder="Make a comment?" style={{ minWidth: '310px', padding: '3px' }} />
              <button type="submit" value="submit" className="btn btn-primary" style={{ margin: '10px', marginTop: '5px' }}>Comment</button>
            </form>
          </Col>
        </Row>
        {
          this.state.comments ?
            this.state.comments.map(comment => (
              <CommentDisplay
                key={comment.id}
                comment={comment}
              />
            ))
            : ''
        }
      </Container>
    );
  }
}


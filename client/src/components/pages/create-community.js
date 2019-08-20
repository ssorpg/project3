import React, { Component } from 'react';
import {
  Container, Col, Row,
  Jumbotron, Form, Button,
  ListGroup, ListGroupItem
} from 'react-bootstrap';
import ax from 'axios';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';

export default class CreateCommunity extends Component {
  constructor() {
    super();
    this.state = {
      communities: [],
      selectFromExisting: false,
      toggleButtonClassName: 'btn btn-success d-none',
      communityId: undefined
    }
  }

  async componentDidMount() {
    const comRes = await ax.get('/api/communities');
    let comArray = [];

    comRes.data.forEach( com => {
      comArray.push({
        id: com.id,
        name: com.name
      });
    });

    if(comArray.length > 0) {
      this.setState({
        communities: comArray,
        selectFromExisting: true,
        toggleButtonClassName: 'btn btn-success'
      });
    }
  }

  handleFormChange = () => {
    let stateBoolean = this.state.selectFromExisting === true ? false : true;

    this.setState({
      selectFromExisting: stateBoolean
    });
  }

  handleRadioSelection = event => {
    this.setState({
      communityId: event.target.getAttribute('data-id')
    })
  }

  handleChosenCommunitySubmit = async event => {
    event.preventDefault();
    try {
      let res = await ax.post(`/api/communities/${this.state.communityId}/users`);
      if(res.status === 200) 
        window.location = `/community/${this.state.communityId}`;
    } catch (error) {
      console.log('Error Adding User To Community : ', error.response);
    }
  }
  
  handleCreateCommunitySubmit = event => {
    event.preventDefault();
    const form = event.target;
    const inputs = form.getElementsByTagName('input')
    const value = inputs[0].value;
    this.createCommunity({name: value});
  }

  createCommunity = async community => {
    try {
      const results = await ax.post('/api/communities', community);
      if(results.status === 200) {
        let communityId = results.data.id;
        window.location = `/community/${communityId}`;
      }
    } catch (error) {
      console.log('error createing community: ', error);
    }
  }

  render() {
    return (
      <Container id="create-community-form">
        <Jumbotron>
          <h1>Create A Community</h1>
          <p>Select a community from the dropdown or fill in a name below to create your own!</p>
        </Jumbotron>
        <Row>
          {this.state.selectFromExisting === true ? 
          <Col className="dropdown">
              <Row>
                <Col>
                  <h3>Choose A Community</h3>
                  <Form onSubmit={this.handleChosenCommunitySubmit}>
                    <Form.Group controlId="selectedCommunity">
                      <h4>Community List</h4>
                      <ListGroup className="list-unstyled text-left"
                        style={{ columns: 2 }}
                        id="community-list"
                      >
                        {this.state.communities.map( com =>
                          <ListGroupItem className="radio"
                            name="community"
                            key={com.id.toString()}
                          >
                            <Form.Check type="radio"
                              name="community"
                              data-id={com.id.toString()}
                              label={com.name}
                              onClick={this.handleRadioSelection}
                            />
                          </ListGroupItem>
                        )}
                      </ListGroup>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                    <Button type="reset">Reset</Button>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button className="btn btn-success" onClick={this.handleFormChange}>
                    Or Create Your Own!
                  </Button>
                </Col>
              </Row>
              </Col>
            :
            <Col className="dropdown">
              <Row>
                <Col className="input">
                  <Form onSubmit={this.handleCreateCommunitySubmit}>
                    <Form.Group controlId="formGroupCommunity">
                      <Form.Label>
                        Enter Your Community Name
                  </Form.Label>
                      <Form.Control type="text" name="community" placeholder="Awesome Community" />
                      <Button type="submit">Submit</Button>
                    </Form.Group>
                  </Form>
                  <Button className={this.state.toggleButtonClassName}
                    onClick={this.handleFormChange}>
                    Or Choose An Existing One!
                  </Button>
                </Col>
              </Row>
            </Col>
            }
        </Row>
      </Container>
    )
  }
}
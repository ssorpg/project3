import React, { Component } from 'react';
import {
  Container, Col, Row,
  Jumbotron, Form, Button,
  Dropdown
} from 'react-bootstrap';
import ax from 'axios';

export default class CreateCommunity extends Component {
  constructor() {
    super();
    this.state = {
      communities: [],
      selectFromExisting: false,
      toggleButtonClassName: 'btn btn-success d-none'
    }
  }

  async componentDidMount() {
    const comRes = await ax.get('/api/communities');
    let comArray = [];

    comRes.data.forEach((com) => {
      comArray.push({
        id: com.id,
        name: com.name
      });
    });

    if(comArray.length > 0) {
      this.setState({
        communities: comArray,
        toggleButtonClassName: 'btn btn-success'
      });
    }
  }

  handleFormChange = () => {
    let stateBoolean = this.state.selectFromExisting ? false : true;

    this.setState({
      selectFromExisting: stateBoolean
    });
  }

  handleChosenCommunity = (event) => {
    event.preventDefault();
  }
  
  handleCreateCommunity = (event) => {
    event.preventDefault();
    const form = event.target;
    const inputs = form.getElementsByTagName('input')
    const value = inputs[0].value;
    this.createCommunity({name: value});
  }
  createCommunity = async (community) => {
    console.log(community);
    try {
      const results = await ax.post('/api/communities', community);
      if(results.status === 200) {
        let communityId = results.data.id;
        // console.log(communityId);
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
                  <Form onSubmit={this.handleChosenCommunity}>
                    <Form.Group controlId="formGroupText">
                      <h4>Community List</h4>
                      <ul className="list-unstyled text-left"
                        style={{ columns: 3 }}
                        id="community-list"
                      >
                        {this.state.communities.map((com) =>
                          <li className="radio"
                            name="community"
                            key={com.id.toString()}
                          >
                            <label>
                              <input type="radio"
                                name="community"
                                data-id={com.id.toString()}
                              />
                              {com.name}
                            </label>
                          </li>
                        )}
                      </ul>
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
                  <Form onSubmit={this.handleCreateCommunity}>
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
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
      selectFromExisting: false
    }
  }

  async componentDidMount() {
    const comRes = await ax.get('/api/communities');
    let comArray = [];

    comRes.data.forEach((com) => {
      comArray.push({ id: com.id, name: com.name });
    });

    this.setState({
      communities: comArray
    });
  }

  handleFormChange = (event) => {
    if (this.state.selectFromExisting) {
      this.setState({
        selectFromExisting: false
      }, () => console.log(this.state));
    } else {
      this.setState({
        selectFromExisting: true
      }, () => console.log(this.state));
    }
  }

  handleChosenCommunity = (event) => {
    event.preventDefault();
  }
  
  handleCreateCommunity = (event) => {

  }

  render() {
    return (
      <Container id="create-community-form">
        <Jumbotron>
          <h1>Create A Community</h1>
          <p>Select a community from the dropdown or fill in a name below to create your own!</p>
        </Jumbotron>
        <Row>
          {this.state.selectFromExisting === false ? 
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
                  <Form>
                    <Form.Group controlId="formGroupCommunity">
                      <Form.Label>
                        Enter Your Community Name
                  </Form.Label>
                      <Form.Control type="text" name="community" placeholder="Awesome Community" />
                      <Button type="submit">Submit</Button>
                    </Form.Group>
                  </Form>
                  <Button className="btn btn-success" onClick={this.handleFormChange}>
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
// COMPONENTS
import React, { Component } from 'react';
import Imageupload from '../../imageupload';
import { UpdateForm } from '../../form';
import { Jumbotron, Row, Col } from 'react-bootstrap';

export default class UpdateProfile extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <Col className="col-6">
          <Jumbotron>
            <h3>Update Profile</h3>
            <UpdateForm />
          </Jumbotron>
          <h3>Profile Photo</h3>
          <Imageupload />
        </Col>
      </Row>
    )
  }
};
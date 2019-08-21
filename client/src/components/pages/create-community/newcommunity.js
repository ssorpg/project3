// COMPONENTS
import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';

export default function NewCommunity({ handleCreateCommunitySubmit, toggleButtonClassName, handleFormChange }) {
  return (
    <Col className="dropdown">
      <Row>
        <Col className="input">
          <Form onSubmit={handleCreateCommunitySubmit}>
            <Form.Group controlId="formGroupCommunity">
              <Form.Label>
                Enter Your Community Name
                  </Form.Label>
              <Form.Control type="text" name="community" placeholder="Awesome Community" />
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form>
          <Button className={toggleButtonClassName}
            onClick={handleFormChange}>
            Or Choose An Existing One!
          </Button>
        </Col>
      </Row>
    </Col>
  );
}
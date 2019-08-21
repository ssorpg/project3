// COMPONENTS
import React from 'react';
import { Col, Row, Form, Button, ListGroup } from 'react-bootstrap';
import CommunityRadio from './communityradio';

export default function SelectFromExisting({ communities, handleChosenCommunitySubmit, handleRadioSelection, handleFormChange }) {
  return (
    <Col className="dropdown">
      <Row>
        <Col>
          <h3>Choose A Community</h3>
          <Form onSubmit={handleChosenCommunitySubmit}>
            <Form.Group controlId="selectedCommunity">
              <h4>Community List</h4>
              <ListGroup className="list-unstyled text-left" style={{ columns: 2 }} id="community-list">
                {
                  communities.map(com =>
                    <CommunityRadio
                      com={com}
                      handleRadioSelection={handleRadioSelection}
                    />
                  )
                }
              </ListGroup>
            </Form.Group>
            <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="btn btn-success" onClick={handleFormChange}>
            Or Create Your Own!
          </Button>
        </Col>
      </Row>
    </Col>
  )
}

import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from '../card.js';

export default function Feed(props) {
  let friends = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Container id="friends">
      <Row>
        <Col>
          <h1>Friends</h1>
        </Col>
      </Row>
      <Row>
        {friends.map(() => {
          return (
            <Col className="col-xs-6 col-md-4">
              <Card cardClass={ "text-dark text-left card"}>
                <nav className="card-nav">
                  <button class="btn btn-default" className="favorite"></button>
                  <button class="btn btn-default" className="select"></button>
                </nav>
              <img class="card-img-top" src="http://place-hold.it/150" alt="Card image cap" />
              <div class="card-body">
                <h5 className="card-title">Username</h5>
              </div>
            </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
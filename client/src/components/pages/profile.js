import React, { Component } from 'react';
import {Container, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import Card from '../card.js';
import Nav from '../navbar.js';

function Profile() {
  return (
    <div>
      <Card cardClass = {
        "text-dark text-left col-12 card"
    }>
      <img class="card-img-top" src="http://place-hold.it/200" alt="Card image cap" />
      <div class="card-body">
        <header>
          <h5 class="card-title">Username</h5>
          <h6 class="card-subtitle">Full Name</h6>
        </header>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

        <div className="networks">
          <h5 class="card-title">Your Networks</h5>
          <ListGroup>
            <ListGroupItem>
              <a href="#">The Jackson Family Network</a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="#">Walmart 703</a>
            </ListGroupItem>
            <ListGroupItem>
              <a href="#">Meme-a-holics 101</a>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </Card>
    </div>
  )
}

export default Profile;
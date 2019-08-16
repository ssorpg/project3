import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';

// function Profile({match: {params: {userId}}}) {
function Profile(req, res) {
  // console.log(parseInt(req.match.params.userId));
  var id = parseInt(req.match.params.userId);
  console.log(req);
  async function getData() {
    let loggedIn = document.cookie.split('=')[1]

    try {
      if (id !== undefined) {
        var results = await ax.get(`/api/users/profile/${id}`);
      } else {
        var results = await ax.get(`/api/users/profile/`);
      }
      console.log('res', results);
    } catch (error) {
      console.log('Error :', error, '\n', res);
      // res.redirect('/');
    }
  }

  return (
    <div onLoad={getData}>
      <Card cardClass = {
        "text-dark text-left col-12 card"
      }>
        <img className="card-img-top" src="http://place-hold.it/200" alt="Card image cap" style={{height: '200px', width: '200px', padding: '20px'}}/>
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
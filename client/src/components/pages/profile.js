import React, { Component } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from '../card.js';
import ax from 'axios';

// function Profile({match: {params: {userId}}}) {
function Profile(req, res) {
  // console.log(parseInt(req.match.params.userId));
  let userId = parseInt(req.match.params.UserId);

  if (document.cookie.indexOf('loggedIn') !== -1) {
    var cookies = document.cookie.split(';');
    var start = cookies.indexOf('UserId');
    var loggedInUserId;

    cookies.forEach(cookie => {
      if (cookie.indexOf('userId') !== -1) {
        loggedInUserId = parseInt(cookie.split('=')[1]);
      }
    })
  }
  
  // console.log(loggedInUserId);
  async function getData() {
    let loggedIn = document.cookie.split('=')[1];
    if (!loggedIn) window.location = '/';
    console.log(isNaN(userId));
    console.log(loggedInUserId);
    try {
      if (isNaN(userId) == true) {
        console.log('checking logged in user')
        var results = await ax.get(`/api/users/profile/${loggedInUserId}`);
      } else {
        console.log('checking someone else')
        var results = await ax.get(`/api/users/profile/${userId}`);
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
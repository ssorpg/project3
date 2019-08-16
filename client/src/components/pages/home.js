import React from 'react';
import {Container, Jumbotron} from 'react-bootstrap';
import Login from './login';

export default function Home() {
  return (
    <Container>
      <Jumbotron id="welcome">
        <h1>Social Networking. Privatized.</h1>
        <p>Imagine a social network for just you and your friends and family. Well stop imagining. We made it. And it’s awesome.</p>
      </Jumbotron>
      <Login />
    </Container>
  )
}

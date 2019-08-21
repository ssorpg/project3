// COMPONENTS
import React from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';

// IMAGES
import tpn from '../../../images/tpn.png'

export default function Home() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <img src={tpn} alt="icon" />
      <Jumbotron id="welcome">
        <h1>Social Networking. Privatized.</h1>
        <p>Imagine a social network for just you and your friends and family. Well stop imagining. We made it. And it’s awesome.</p>
      </Jumbotron>
      <Row>
        <Col>
          <Jumbotron>
            <p>Pour-over poutine coloring book, asymmetrical cray pitchfork jianbing taxidermy marfa art party cronut. Pork belly hot chicken XOXO, mustache vinyl succulents hoodie twee selfies enamel pin tousled sartorial schlitz chicharrones yr. Man braid raclette migas fashion axe cornhole tbh gastropub. Jean shorts irony iPhone, tofu chia brooklyn actually edison bulb 3 wolf moon. Pour-over wolf deep v skateboard beard brooklyn.</p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  )
}

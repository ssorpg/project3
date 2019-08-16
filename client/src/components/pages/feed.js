import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../card.js';
import './images/icons/svg/star-empty.svg';
import './images/icons/svg/star-full.svg';
import './images/icons/svg/check-empty.svg';
import './images/icons/svg/check-full.svg';

export default function Feed(props) {
  let comments = [1,2,3,4,5,6,7,8,9,10,11,12];

  return (
    <Container>
      <Row>
        <Col>
          <h1>The Network Feed</h1>
        </Col>
      </Row>
      <Row>
        <Col className="col-12">
          <form class="form-group">
            <input type="text" name="feed-comment" placeholder="Tell the community what you're thinking…" />
            <button type="submit" value="submit" className="btn btn-primary">Submit</button>
          </form>
        </Col>
      </Row>
      <Row>
        {comments.map( () => {
          return (
            <Col xs={12} md={6} style={{padding:'10px'}}>
              <div className="comment">
                <Card cardClass={ "text-dark text-left card"}>
              <h4 class="username">Father Jackson</h4>
              <Row>
              <Col className="col-3">
                  <figure className="float:right"
                    style={{
                      borderRadius: '150px',
                      overflow: 'hidden'
                    }}>
                    <img src="http://place-hold.it/150" alt="of a guy" style={{maxWidth: '100%'}} />
                  </figure>
                </Col>
                <Col className="col-9">
                  <p className="comment">Man, this site is great! I love keeping in touch with my family without having to deal with a large corporation!</p>
                  <ul style={{padding: 0}}>
                    <li class="btn btn-like" style={{paddingLeft: 0}}>
                      <a href="#">Like</a>
                    </li>
                    <li class="btn btn-dislike">
                      <a href="#">Dislike</a>
                    </li>
                    <li class="btn btn-comment">
                      <a href="#">Comment</a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card>
              </div>
            </Col>  
          );
        })}
      </Row>
    </Container>
  );
}
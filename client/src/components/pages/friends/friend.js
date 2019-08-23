// COMPONENTS
import React from 'react';
import { Col } from 'react-bootstrap';
import Card from '../../card.js';
import Profilephoto from '../../profilephoto';

export default function Friend({ friend, CommunityId }) {
  return (
    <Col xs={6} sm={4} lg={2} style={{ minWidth: '200px' }}>
      <a href={`/community/${CommunityId}/friends/${friend.id}`}>
        <Card cardClass="text-dark text-left card">
          <nav className="card-nav">
            {/* <button class="btn btn-default" className="favorite"></button> */}
            {/* <button class="btn btn-default" className="select"></button> */}
          </nav>
          <Profilephoto id={friend.id} />
          <div class="card-body">
            <h5 className="card-title">{friend.name}</h5>
          </div>
        </Card>
      </a>
    </Col>
  )
}
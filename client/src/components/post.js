// COMPONENTS
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from './card.js';
import OtherPhoto from './otherphoto';

export default function Post({ post, vote, addComment }) {
  return (
    <Col key={post.id.toString()} md={12} lg={6} style={{ padding: '15px' }}>
      <div className="comment">
        <Card cardClass={"text-dark text-left card"}>
          <a href={"/community/" + post.CommunityId + "/friends/" + post.author.id}>
            <h4 className="username" style={{ margin: '10px' }}>
              {post.author.name}
            </h4>
          </a>
          <Row className="justify-content-center">
            <a href={"/community/" + post.CommunityId + "/friends/" + post.author.id}>
              <Col className="col-12">
                <figure className="float:right"
                  style={{
                    borderRadius: '150px',
                    overflow: 'hidden'
                  }}>
                  <OtherPhoto id={post.authorId} />
                </figure>
              </Col>
            </a>
            <Col className="col-8" style={{ minHeight: '100px' }}>
              <p className="comment">{post.message}</p>
              <ul style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
                <li className="btn" style={{ padding: '2px' }}>
                  <button className="btn btn-success" onClick={vote} data-id={post.id} data-vote={"1"}>Like</button>
                </li>
                <li className="btn" style={{ padding: '2px' }}>
                  <button className="btn btn-danger" onClick={vote} data-id={post.id} data-vote={"-1"}>Dislike</button>
                </li>
                <li className="btn" style={{ padding: '2px' }}>
                  <button className="btn btn-primary" onClick={addComment} data-id={post.id}>Comment</button>
                </li>
              </ul>
            </Col>
            <div style={{ position: 'absolute', top: '5px', right: '10px' }}>
              <h6 id={'postScore' + post.id}>Score: {post.score}</h6>
            </div>
          </Row>
        </Card>
      </div>
    </Col>
  )
}
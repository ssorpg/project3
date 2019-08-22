// COMPONENTS
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from './card.js';
import Profilephoto from './profilephoto';
import CommentOnPosts from './commentOnPosts';


export default function Post({ post, vote }) {
  return (
    <Col key={post.id.toString()} md={12} lg={6} style={{ padding: '15px' }}>
      <div className="comment">
        <Card cardClass={"text-dark text-left card"}>
          <a href={"/community/" + post.CommunityId + "/friends/" + post.author.id}>
            <h4 className="username" style={{ margin: '10px' }}>
              {post.author.name}
            </h4>
          </a>
          <Row className="justify-content-center" style={{ width: '100%', margin: 0 }}>
            <Col className="col-4">
              <a href={"/community/" + post.CommunityId + "/friends/" + post.author.id}>
                <figure className="float:right"
                  style={{
                    borderRadius: '150px',
                    overflow: 'hidden'
                  }}>
                  <Profilephoto
                    id={post.authorId}
                    size={'150px'}
                  />
                </figure>
              </a>
            </Col>
            <Col className="col-8" style={{ minHeight: '100px' }}>
              <p className="comment">{post.message}</p>
            </Col>
            <Col className="col-12 justify-content-end">
              <ul style={{ margin: 0, textAlign: 'right' }}>
                <li className="btn" style={{ padding: '2px' }}>
                  <button className="btn btn-success" onClick={vote} data-id={post.id} data-vote={"like"}>Like</button>
                </li>
                <li className="btn" style={{ padding: '2px', marginRight: '5px' }}>
                  <button className="btn btn-danger" onClick={vote} data-id={post.id} data-vote={"dislike"}>Dislike</button>
                </li>
                {/* <li className="btn">
                  <button className="btn btn-primary" onClick={addComment} data-id={post.id}>Comment</button>
                </li> */}
              </ul>
            </Col>
            <div style={{ position: 'absolute', top: '5px', right: '10px' }}>
              <h6 id={'postScore' + post.id}>Score: {post.score}</h6>
            </div>
          </Row>
          <CommentOnPosts
            data={post}
          />
        </Card>
      </div>
    </Col>
  )
}
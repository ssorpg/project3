// COMPONENTS
import React from 'react';
import { Nav } from 'react-bootstrap';

export default function NavbarLeft({ CommunityId }) {
  return (
    <Nav className="mr-auto nav navbar-nav navbar-left">
      {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
      {
        CommunityId
          ? <Nav.Link href={"/community/" + CommunityId}>Feed</Nav.Link>
          : ''
      }
      {
        CommunityId
          ? <Nav.Link href={"/community/" + CommunityId + "/friends"}>Friends</Nav.Link>
          : ''
      }
      {
        CommunityId
          ? <Nav.Link href={"/community/" + CommunityId + "/chat"}>Chat</Nav.Link>
          : ''
      }
    </Nav>
  )
}
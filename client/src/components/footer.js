import React, { Component } from 'react';
import { Nav, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import Chat from './pages/chat';

export default class Footer extends Component {

    render() {
        return (
            <Nav style={{ position: 'fixed', bottom: '0' }}>
             <strong>© T P N</strong>
            </Nav>
        );
    }
}



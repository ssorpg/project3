import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';

export default class Footer extends Component {

    render() {
        return (
            <Nav style={{ position: 'fixed', bottom: '0' }}>
             <strong>© T P N</strong>
            </Nav>
        );
    }
}



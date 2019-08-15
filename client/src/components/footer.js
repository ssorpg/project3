import React, { Component } from 'react';
import { Nav, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import Chat from './pages/chat';

export default class Footer extends Component {

    componentDidMount() {
        console.log('testing',this.state);
    }

    render() {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">The Private Chat</Popover.Title>
                <Popover.Content>
                    <Chat />
                </Popover.Content>
            </Popover>
        );
    
        const ChatButton = () => (
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <Button variant="success" style={{float:'right'}}>Chat</Button>
            </OverlayTrigger>
        );

        return (
            <Nav fixed="bottom">
                <ChatButton />
            </Nav>
        );
    }
}



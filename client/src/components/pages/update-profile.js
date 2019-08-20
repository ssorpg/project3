import React, { Component } from 'react';
import { UpdateForm } from '../form';
import { Jumbotron, Row, Col } from 'react-bootstrap';

export default class UpdateProfile extends Component {
    render() {
        return (
            <Row>
                <Jumbotron>
                    <UpdateForm />
                </Jumbotron>
            </Row>
        )
    }
};
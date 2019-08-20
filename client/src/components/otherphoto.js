import React, { Component } from 'react';
import axios from 'axios';

export default class OtherPhoto extends Component {
    state = {
        filename: ''
    }

    componentDidMount() {
        console.log('HELLUR?', this.props.id);
        this.findImage();
    };

    //fix later to attach userid to image incoming from props??
    findImage() {
        let userid = this.props.id;

        axios.get(`/api/${userid}/images`)
            .then(response => {
                let filename = response.data[0].filename;
                this.setState({ filename });
                return;
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <img src={`/images/${this.state.filename}`} style={{height:'150px', width:'150px'}} alt="profile" />
        )
    }
}

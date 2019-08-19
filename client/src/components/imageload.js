import React, { Component } from 'react';
import axios from 'axios';

export default class Imageload extends Component {
    state = {
        filename: '51d93fa72053ac5d4e44cc57b78824ad'
    };
   
    componentDidMount() {
        this.findImage();
    }
    
    //fix later to attach userid to image incoming from props??
    findImage() {
        axios.get(`/api/images`)
            .then(response => {
                //console.log(response.data[0].filename);
                let filename = response.data[0].filename;
                this.setState({ filename: filename });
                return;
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                {console.log(this.state.filename)}
                <img src={require(`../public/user/images/${this.state.filename}`)} alt=""></img>
            </div>
        )
    }
}

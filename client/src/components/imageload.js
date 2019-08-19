import React, { Component } from 'react';
import axios from 'axios';

class Imageload extends Component {
    state = {
        filename: ''
    };
   
    componentDidMount() {
        this.findImage();
    };

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
                {/* <img src={require(`../public/user/images/${this.state.filename}`)}></img> */}
                <img src={`/images/${this.state.filename}`} />
            </div>
        )
    }
}

export default Imageload;
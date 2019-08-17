import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

export default class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        }, () => {
            let fd = new FormData();
            fd.append('image', this.state.pictures[0], this.state.pictures[0].name);

            axios.post('/api/images', fd).then(res => {
                console.log(res);
            });
        });
    }



    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880000000}
            />
        );
    }
}
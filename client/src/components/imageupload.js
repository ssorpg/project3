import React, { Component } from 'react'
import { Form, Dropdown } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import axios from 'axios';
import fs from 'fs';

export default class ImageUpload extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = { pictures: [] };
    //     this.onDrop = this.onDrop.bind(this);
    // }

    // onDrop(picture) {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }

    // onDrop(pictures) {
    //     if (pictures.length > 0) {
    //         let index = pictures.length - 1;
    //         let formData = new FormData();

    //         formData.append('file', pictures[index], pictureFiles[index].name);
    //         console.log(formData);
    //         axios.post('/img/main', formData).then(res => {
    //             this.setState({
    //                 images: this.state.images.concat('/images/main/' + pictures[index].name),
    //             });
    //         }).catch(err => {
    //             console.log(err);
    //         });
    //     }
    // }
    upload(formData) {
        // event.preventDefault();
        // let fd = new FormData();
        // let files = ('#file')[0].files[0];
        // fd.append('file', files);
        let inputs = formData.getElementsByTagName('input');
        let postData = {};

        for (let i = 0; i < inputs.length; i++) {
            postData[inputs[i].name] = inputs[i].value;
        }

        console.log(postData);
        axios.post('/img/main', postData).then(res => {
            console.log(res);
        });

    };

    render() {
        return (
            // <ImageUploader
            //     withIcon={true}
            //     buttonText='Choose images'
            //     onChange={this.onDrop}
            //     imgExtension={['.jpg', '.gif', '.png', '.gif']}
            //     maxFileSize={5242880}
            // />
            <form id='image-chooser' onSubmit={this.upload}>
                <div>
                    <label for="image">Choose photo to upload</label>
                    <input type="file" id="file" name="image" accept="image/png, image/jpeg" />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>


        )
    }
};

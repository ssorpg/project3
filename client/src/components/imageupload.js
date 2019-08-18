import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

export default class ImageUpload extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = { pictures: [] };
    //     this.onDrop = this.onDrop.bind(this);
    // }

    // onDrop(picture) {
    //     this.setState({
    //         pictures: this.state.pictures.concat(picture),
    //     }, () => {
    //         let fd = new FormData();
    //         console.log(this.state.pictures[0]);
    //         fd.append('file', this.state.pictures[0]);
    //         //console.log(fd);

    //         axios.post(`/api/images`, {
    //             type: 'post',
    //             data: fd,
    //             contentType: false,
    //             processData: false,
    //         }).then(res => {
    //             console.log(res);
    //         });
    //     });
    // }



    // render() {
    //     return (
    //         <ImageUploader
    //             withIcon={true}
    //             buttonText='Choose images'
    //             onChange={this.onDrop}
    //             imgExtension={['.jpg', '.gif', '.png', '.gif']}
    //             maxFileSize={5242880000000}
    //         />
    //     );
    constructor() {
        super();
        this.state = {
          description: '',
          selectedFile: '',
        };
      }

      onChange = (e) => {
        switch (e.target.name) {
          case 'selectedFile':
            this.setState({ selectedFile: e.target.files[0] });
            break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
      }

      onSubmit = (e) => {
        e.preventDefault();
        const { description, selectedFile } = this.state;
        let formData = new FormData();

        formData.append('description', description);
        formData.append('selectedFile', selectedFile);

        axios.post('/api/images', formData)
          .then((result) => {
            console.log(result);
          });
      }

      render() {
        const { description, selectedFile } = this.state;
        return (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="description"
              value={description}
              onChange={this.onChange}
            />
            <input
              type="file"
              name="selectedFile"
              onChange={this.onChange}
            />
            <button type="submit">Submit</button>
          </form>
        );
    }
}
import React, { Component } from 'react';
import axios from 'axios';

export default class ImageUpload extends Component {
    constructor() {
        super();
        this.state = {
          description: '',
          selectedFile: '',
        };
      }

      onChange = e => {
        switch (e.target.name) {
          case 'selectedFile':
            this.setState({ selectedFile: e.target.files[0] });
            break;
          default:
            this.setState({ [e.target.name]: e.target.value });
        }
      }

      onSubmit = e => {
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
        const { description/* , selectedFile */ } = this.state; // just so we don't get react warns
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
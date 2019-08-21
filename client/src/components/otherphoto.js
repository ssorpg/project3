import React, { Component } from 'react';
import axios from 'axios';

export default class OtherPhoto extends Component {
  state = {
    filename: ''
  }

  componentDidMount() {
    console.log('IMG ID: ', this.props.id);
    this.findImage();
  };

  //fix later to attach userid to image incoming from props??
  findImage() {
    const userid = this.props.id;

    axios.get(`/api/${userid}/images`)
      .then(response => {
        const filename = response.data[0].filename;
        this.setState({ filename });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <img src=
        {
          this.state.filename
            ? `/images/${this.state.filename}`
            : 'http://place-hold.it/200'
        }
        style={{ height: '100px', width: '100px' }}
        alt="profile"
      />
    )
  }
}

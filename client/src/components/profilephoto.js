import React, { Component } from 'react';
import axios from 'axios';

export default class OtherPhoto extends Component {
  state = {
    filename: ''
  }

  componentDidMount() {
    // console.log('IMG ID: ', this.props.id);
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
            : 'https://cdn2.iconfinder.com/data/icons/ui-1/60/05-512.png'
        }
        style={{ height: this.props.size, width: this.props.size, padding: '15px' }}
        alt="profile"
      />
    )
  }
}

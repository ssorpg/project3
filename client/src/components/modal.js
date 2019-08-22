import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    console.log(props);
  }

  render() {
    return (
      <div className="alert alert-danger">
        <p>
          <strong>Error: </strong>
          {this.state.errorAlert}
        </p>
      </div>
    )
  }
}
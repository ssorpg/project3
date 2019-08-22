import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorAlert: props.error,
      successAlert: props.success,
    }
  }

  render() {
    return (
    <div>
      {
        this.state.props.error ?
          <div className="alert alert-danger">
            <p>
              <strong>Error: </strong>
              {this.state.errorAlert}
            </p>
          </div>
          :
          <div className="alert alert-success">
            <p>
              <strong>Success: </strong>
              {this.state.errorAlert}
            </p>
          </div>
        }
      </div>
    )
  }
}
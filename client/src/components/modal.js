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
      <div style={{ position: 'absolute', top: '15%', left: '25%', zIndex: '99', minWidth: '150px'}}>
      {
        this.state.errorAlert ?
          <div className="alert alert-danger">
            <p>
              <strong>Error: </strong>
              {this.state.errorAlert}
            </p>
          </div>
        :
          ''
       }
       {this.state.successAlert ?
          <div className="alert alert-success">
            <p>
              <strong>Success: </strong>
              {this.state.errorAlert}
            </p>
          </div>
        :
          ''
        }
      </div>
    )
  }
}
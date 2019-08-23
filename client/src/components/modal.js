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
      <div style={{ position: 'absolute', bottom: '-60%', left: '25%', zIndex: '9999', minWidth: '150px' }}>
        {console.log(this.state)}
        {
          this.state.errorAlert ?
            <div className="alert alert-danger">
              <p>
                <strong>Error: </strong>
                {this.state.errorAlert}
              </p>
            </div>
            : ''
        }
        {
          this.state.successAlert ?
            <div className="alert alert-success">
              <p>
                <strong>Success: </strong>
                {this.state.errorAlert}
              </p>
            </div>
            : ''
        }
      </div>
    )
  }
}
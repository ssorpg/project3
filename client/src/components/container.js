import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap';

export default function Container({children}) {
    return (
      <Jumbotron style={{textAlign: "Center"}}>
          {children}
      </Jumbotron>
    );
  }

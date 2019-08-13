import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Card(props) {
  return (
    <div className={props.cardClass}>
      {props.children}
    </div>
  )
}
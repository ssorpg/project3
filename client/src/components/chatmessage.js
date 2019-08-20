import React from 'react'

export default ({ name, message }) => 
  <li className="chat">
    <strong>{name} : </strong>  <em>{message}</em>
  </li>

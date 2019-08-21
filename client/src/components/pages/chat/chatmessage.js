// COMPONENTS
import React from 'react'

export default function ChatMessage({ name, message }) {
  return (
    <li className="chat">
      <strong>{name} : </strong>  <em>{message}</em>
    </li>
  );
}
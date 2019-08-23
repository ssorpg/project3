// COMPONENTS
import React from 'react';

export default function Card({ cardClass, children }) {
  return (
    <div className={cardClass}>
      {children}
    </div>
  )
}
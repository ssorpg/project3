import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/navbar.js';
import Profile from './components/pages/profile';

function App() {
  return (
    
    <div className="App">
      <Nav />
      <h1>MATT KEV AND JON ARE COOL</h1>
      <Profile />
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/navbar';
import Container from './components/container'
import { LoginForm } from './components/form';
import { LoginButton, Register } from './components/buttons';
import { Footer } from './components/footer';
import Login from './pages/login';

function App() {
  return (

    <div className="App">
      <Login />
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesComponent from './components/Particles/Particles';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="particles" >
        <ParticlesComponent />
      </div>
      <div className='content'>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    </div>
  );
}

export default App;

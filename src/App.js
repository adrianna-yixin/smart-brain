import React, { useState, Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesComponent from './components/Particles/Particles';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setSignedInState] = useState(false);

  function calculateFaceLocation(regions) {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boundingBox = regions[0].region_info.bounding_box;
    return {
      leftCol: boundingBox.left_col * width,
      rightCol: width - (boundingBox.right_col * width),
      topRow: boundingBox.top_row * height,
      bottomRow: height - (boundingBox.bottom_row * height)
    }
  }

  function displayBox(box) {
    setBox(box);
  }

  function onInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit() {
    setUrl(input);

    // Set up the face recognition model
    const PAT = 'd0bfaa61bd6c4701ba955f72c01a290e';
    const USER_ID = 'yixin';
    const APP_ID = 'face-detection';
    const MODEL_ID = 'face-detection';
    // The line below is important
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
              // "base64": IMAGE_BYTES_STRING
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        return result.outputs[0].data.regions;
      })
      .then(regions => displayBox(calculateFaceLocation(regions)))
      .catch(error => console.log('error', error));
  }

  function handleRouteChange(route) {
    setRoute(route);
    if (route === "home") setSignedInState(true);
    else if (route === "signout") setSignedInState(false);
  }

  return (
    <div className="App">
      <ParticlesComponent className="particles" />
      <div className='content'>
        <Navigation isSignedIn={isSignedIn} onRouteChange={handleRouteChange} />
        {route === "home"
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={handleSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (route === "signin"
            ? <Signin onRouteChange={handleRouteChange} />
            : <Register onRouteChange={handleRouteChange} />)
        }
      </div>
    </div>
  );
}

export default App;

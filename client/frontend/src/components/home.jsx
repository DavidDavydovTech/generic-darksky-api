import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const Home = (props) => {
  const [ address, setAddress ] = useState('');
  const history = useHistory();
  const goToForecast = () => history.push(`/forecast?address=${address}`);
  // NOTE: In a normal project you'd use redux or something to set the 
  // background image, but this project is too small for that to be 
  // worth setting up.
  // NOTE: This is supposed to be using the /weather/photo API
  // but due to reasons mentioned in that API's comments this
  // current frontend uses unsplash at the time of completion.
  // In a real project this frontend would obviously be using
  // the API since its proxying requests via our API key.
  document.body.style.backgroundImage = `url(https://source.unsplash.com/1920x1280/?bright,sunny,scenery)`

  return (
    <div className="center-col">
      <h1 className="title">Weather App</h1>
      <form onSubmit={ e => {
        e.preventDefault();
        goToForecast();
      }}>
        <input
          className="px-6 py-4 text-3xl m-4 rounded-xl font-sans shadow-xl"
          placeholder="Type in an address"
          name="address"
          value={address}
          onChange={ e => setAddress(e.target.value)}
        />
      </form>
      <button 
        className="rounded-full bg-white text-3xl mt-6 p-4 shadow-xl transform duration-700 hover:scale-150 hover:bg-gray-300 hover:animate-ping"
        onClick={ goToForecast }
      >
        🔍
      </button>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Forecast = (props) => {
  const [ reqSent, setReqSent ] = useState(false);
  let { address } = useParams();
  console.log('ADDRESS:', address)
  useEffect(() => {
    
  })
  document.body.style.backgroundImage = `url(https://source.unsplash.com/1920x1280/?bright,sunny,scenery)`

  return (
    <div className="center-col">
      <h1 className="title">Sunny</h1>
    </div>
  );
};

export default Forecast;
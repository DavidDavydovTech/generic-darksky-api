import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Forecast = (props) => {
  const [ reqSent, setReqSent ] = useState(false);
  const [ data, setData ] = useState(null);
  let { address } = useParams();
  console.log('ADDRESS:', address)
  useEffect(() => {
    if (reqSent === false) {
      setReqSent(true);
      axios({
        method: 'GET',
        baseURL: 'http://localhost:9001/api/weather',
        params: {
          address: '2622 Brown Street',
        }
      })
        .then( response => {
          setData(response.data);
          console.log(response.data)
          const currentWeather = response.data.currently.summary.toLowerCase();
          // NOTE: This is supposed to be using the /weather/photo API
          // but due to reasons mentioned in that API's comments this
          // current frontend uses unsplash at the time of completion.
          // In a real project this frontend would obviously be using
          // the API since its proxying requests via our API key.
          document.body.style.backgroundImage = `url(https://source.unsplash.com/1920x1280/?bright,${currentWeather},scenery)`
  
        })
        .catch( err => console.log(err))
    }
  })
  if (data === null) {
    return (
      <div className="center-col">
        <h1 className="title">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="center-col">
        <h1 className="title">{data.currently.summary}</h1>
        <div className="bg-gray-100 shadow-2xl rounded-xl p-8">
          <h2 className="font-bold text-5xl w-full">{data.minutely.summary}</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="center-col">
      { data === null ? <h1 className="title">Loading...</h1> : <h1 className="title">{data.currently.summary}</h1> }
    </div>
  );
};

export default Forecast;
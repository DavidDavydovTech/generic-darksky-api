
// -- Package Imports --
const axios = require('axios');


// -- Other Imports --
const { APIKeys: { darkSky: APIKey }} = require('../../config.secret.js');


// -- Setup --
const darkSky = axios.create({
  baseURL: 'https://api.darksky.net/',
  timeout: 2000,
});


// -- Main --
const getForecastByCoords = ({ latitude, longitude }) => {
  return darkSky.get(`/forecast/${APIKey}/${latitude},${longitude}`);
}


// -- Exports --
module.exports = {
  getForecastByCoords,
}
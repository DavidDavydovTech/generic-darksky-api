
// -- Package Imports --
const axios = require('axios');


// -- Other Imports --
const { APIKeys: { pexels: APIKey }} = require('../../config.secret.js');


// -- Setup --
const pexels = axios.create({
  baseURL: 'https://api.pexels.com/v1/',
  timeout: 2000,
  headers: {
    Authorization: APIKey
  }
});
const allowedForcasts = [
  'rain',
  'sun',
  'cloudy',
  'snow',
  'storm',
];


// -- Main --
const getRandomForecastImage = ({ forecast }) => {
  if (allowedForcasts.includes( forecast ) === false ) {
    return new Promise( (resolve, reject) => {
      // TODO: Remove indentation.
      const error = new Error(
        `"${forecast}" is not a valid forecast. Please provide one of the following forecasts instead: \n
        ${JSON.stringify(allowedForcasts)}`
      );
      error.status = 400;
      reject(error);
    });
  } else {
    return pexels.get('/search', {
      params: {
        size: 'small',
        query: forecast,
        per_page: 10,
      }
    })
      .then( response => {
        const photos = response.data.photos;
        const randomIndex = Math.floor( Math.random() * photos.length )
        return response.data.photos[randomIndex];
      });
  }
}


// -- Exports --
module.exports = {
  getRandomForecastImage,
}


// -- Package Imports --
const axios = require('axios');


// -- Other Imports --
const { APIKeys: { positionStack: APIKey }} = require('../../config.secret.js');


// -- Setup --
const positionStack = axios.create({
  baseURL: 'http://api.positionstack.com/v1/',
  timeout: 2000,
});


// -- Main --
const getCoordsByAddress = ({ address }) => {
  positionStack.get('/forward', {
    params: {
      access_key: APIKey,
      query: address,
    }
  });
}


// -- Exports --
module.exports = {
  getCoordsByAddress,
}
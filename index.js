// -- Package imports --
const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');


// -- Other Imports --
const reportError = require('./lib/middleware/reportError');
const config = require('./config.secret.js');


// -- Setup --
// Get default ENV from
const env = Object.assign( dotenv.config().parsed || {}, process.env);
const {
  GENERIC_DARKSKY_API_PORT,
  GENERIC_DARKSKY_API_SHOULD_RUN
} = env;
const app = express();
const router = express.Router();
app.use(router);
router.use(reportError);


// -- Main --
router.get('/', async (req, res) => {
  const {
    address
  } = req.query;
  console.log(config.APIKeys.positionStack)
  axios({
    method: 'GET',
    url: 'http://api.positionstack.com/v1/forward',
    params: {
      access_key: config.APIKeys.positionStack,
      query: '1600 Pennsylvania Ave NW, Washington DC'
    }
  })
    .then( async response => res.send(response.data))
    .catch( async err => {
      console.log(err.response.data)
      res.reportError({devMessage: 'Unknown error', status: 500, errorObject: err})
    })
});


// -- Launch App --
if (GENERIC_DARKSKY_API_SHOULD_RUN === '1') {
  try {
    const port = Number.parseInt(GENERIC_DARKSKY_API_PORT);
    const backupPort = 9001;
    app.listen( port || backupPort );
  } catch (err) {
    console.error(
      'Got an error while trying to launch the app (is your GENERIC_DARKSKY_API_PORT a number?).\n\n',
      err
    );
  }
}


// -- Exports --
module.exports = {
  WeatherApp: app,
  WeatherRouter: router,
};
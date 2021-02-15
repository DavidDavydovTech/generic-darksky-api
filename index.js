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
const {
  APIKeys: {
    positionStack,
    darkSky,
  }
} = config;
const app = express();
const router = express.Router();
app.use(router);
router.use(reportError);


// -- Main --
router.get('/', async (req, res) => {
  const {
    address
  } = req.query;

  axios({
    method: 'GET',
    url: 'http://api.positionstack.com/v1/forward',
    params: {
      access_key: positionStack,
      query: address,
    }
  })
    .then( async response => {
      const data = response.data.data;
      if (res.reportError === true) return;
      if (Array.isArray(data) && data.length > 0) {
        const { latitude, longitude} = data[0];
        return axios({
          method: 'GET',
          url: `https://api.darksky.net/forecast/${darkSky}/${latitude},${longitude}`
        });
      } else {
        const err = new Error('Invalid address or location (did you make a typo?)');
        err.status = 400;
        throw err;
      }
    })
    .then( async response => {
      if (res.reportError === true) return;
      res.status(200).send(response.data);
    })
    .catch( async err => {
      // NOTE: Sometimes you can get away with only 1 catch like in 
      // this route, but if you can't you'll need to use the
      //  `if (res.reportError === true) return;`
      // line at the top of every then statement. This route doesn't
      // need it, but it's used anyway as an example until more routes
      // are added.
      console.log(err.isAxiosError, err.statusCode)
      if (err.isAxiosError === true) {
        const { status, data } = err.response;
        res.reportError({
          devMessage: 'Got an error while trying to reach an external API', 
          status, 
          errorObject: err,
          additionalDetails: data
        });
      } else {
        res.reportError({
          devMessage: err.message, 
          status: err.status || 500, 
          errorObject: err instanceof Error ? err : null,
          additionalDetails: err.response
        });
      }
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
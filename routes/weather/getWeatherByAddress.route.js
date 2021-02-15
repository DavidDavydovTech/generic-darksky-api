
// -- Package imports --
const express = require('express');


// -- Other Imports --
const { getCoordsByAddress } =  require('../../lib/externalRequests/positionStack.req');
const { getForecastByCoords } =  require('../../lib/externalRequests/darkSky.req');


// -- Setup --
const router = express.Router();


// -- Main --
router.get('/', async (req, res) => {
  const {
    address
  } = req.query;

  getCoordsByAddress({ address })
    .then( async response => {
      const data = response.data.data;
      if (res.reportError === true) return;
      if (Array.isArray(data) && data.length > 0) {
        const { latitude, longitude } = data[0];
        return getForecastByCoords({ latitude, longitude });
      } else {
        const err = new Error('Invalid address or location (did you make a typo?)');
        err.status = 400;
        throw err;
      }
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


// -- Exports --
module.exports = router;
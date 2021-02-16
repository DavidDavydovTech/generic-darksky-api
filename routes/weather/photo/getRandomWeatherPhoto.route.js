
// -- Package imports --
const express = require('express');


// -- Other Imports --
const { getRandomForecastImage } =  require('../../../lib/externalRequests/pexels.req');

// -- Setup --
const router = express.Router();


// -- Main --
router.get('/', async (req, res) => {
  const {
    forecast
  } = req.query;

  getRandomForecastImage({ forecast })
    .then( data => {
      res.status(200).send(data);
    })
    .catch( async err => {
      // NOTE: Sometimes you can get away with only 1 catch like in 
      // this route, but if you can't you'll need to use the
      //  `if (res.reportError === true) return;`
      // line at the top of every then statement. This route doesn't
      // need it, but it's used anyway as an example until more routes
      // are added.
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

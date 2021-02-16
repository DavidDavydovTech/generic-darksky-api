
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
      // NOTE: What's the point in having a reporter built in to the 
      // res object if I need to copy-paste code anyway?... Fix this.
      // TODO: Make the error reporter check for axios errors on its 
      // own. 
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

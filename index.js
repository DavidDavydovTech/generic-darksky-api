// -- Package imports --
const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');


// -- Other Imports --
const reportError = require('./lib/middleware/reportError');
const routeReducer = require('./routes/routeReducer');

// -- Setup --
// Get default ENV from
const env = Object.assign( dotenv.config().parsed || {}, process.env);
const {
  GENERIC_DARKSKY_API_PORT,
  GENERIC_DARKSKY_API_SHOULD_RUN
} = env;
const app = express();
app.use(reportError);
app.use('/api', routeReducer);



// -- Launch App --
// Note, this won't run if this file is being imported in to another file.
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
};
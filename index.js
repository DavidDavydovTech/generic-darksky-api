// -- Package imports --
const dotenv = require('dotenv');
const express = require('express');


// -- Setup --
// Get default ENV from
const env = Object.assign( dotenv.config().parsed || {}, process.env);
const {
  GENERIC_DARKSKY_API_PORT,
  GENERIC_DARKSKY_API_SHOULD_RUN
} = env;
const app = express();
const router = express.Router();


// -- Main --



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
};
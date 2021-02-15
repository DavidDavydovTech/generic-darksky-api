// -- Package imports --
const env = require('dotenv').config();
const express = require('express');


// -- Setup --
const {
  GENERIC_DARKSKY_API_SHOULD_RUN,
  GENERIC_DARKSKY_API_PORT,
} = env;
const app = express();
const router = express.Router();


// -- Main --


// -- Launch App --
if (GENERIC_DARKSKY_API_SHOULD_RUN === true) {
  try {
    app.listen(GENERIC_DARKSKY_API_PORT);
  } catch (err) {
    console.error(
      'Got an error while trying to launch the app (is your GENERIC_DARKSKY_API_PORT a number?).',
      err
    );
  }
}


// -- Exports --
module.exports = {
  WeatherApp: app,
};
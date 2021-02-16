// -- Package imports --
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');


// -- Other Imports --
const reportError = require('./lib/middleware/reportError');
const routeReducer = require('./routes/routeReducer');
const clientRouter = require('./client/client.router');

// -- Setup --
// Get default ENV from
const env = Object.assign( dotenv.config().parsed || {}, process.env);
const {
  GENERIC_DARKSKY_API_PORT,
  GENERIC_DARKSKY_API_SHOULD_RUN
} = env;
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(compression());
// app.use(express.json()); // Add back when you add put/post routes
app.use(reportError);
app.use('/api', routeReducer);
app.use('/*', clientRouter)



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
# generic-darksky-api
Generic Darksky API for North Western Mutual

## Getting Started
 1. Edit the `config.example.js` file to contain your API keys.
    * This project uses **pexels**. If you're missing an API for them you can signup [here](https://www.pexels.com/onboarding/) and view more about their api [here](https://www.pexels.com/api/).
    * This project uses **positionstack**. If you're missing an API for them you can get one [here](https://positionstack.com/signup/free).
 2. Change the name of `config.example.js` to `config.secret.js`. 
 3. Install [NodeJS](https://nodejs.org/en/) (14.15.5 prefered) on your system.
 4. Install [Yarn](https://classic.yarnpkg.com/en/docs/install/) v1.x on your system.
 5. Open your terminal/command line in the folder containing this readme file.
 6. Type `cd client/frontend` + `enter` then `yarn install` + `enter` and hit enter.
 6. Type `yarn build-prod` and hit `enter`.
 7. Type `cd ../../` + `enter` then `yarn install` + `enter` then `yarn start:dev` + `enter` to start the server in development mode. 
    * Alternatively check the Scripts for a full list.

## Scripts
 * **`yarn prep`:** Installs the yarn dependancies and runs scripts in the client folder to install and build the frontend.
 * **`yarn start`:** Starts the server via `forever`.
 * **`yarn start:dev`:** Starts the server via `nodemon`.
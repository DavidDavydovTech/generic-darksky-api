// -- Package Imports --
const { Router } = require('express');
const { readdirSync } = require('@jsdevtools/readdir-enhanced');
const { join } = require('path');


// -- Setup Vars --
const router = Router();


// -- Main --
// Get a list of every file in this directory that matches "*.route.js" (recursive).
const routePaths = readdirSync(__dirname, {deep: true, filter: /.{0,}\.route\.js/});
for (let routePath of routePaths) {
  // Turn the file path string in to an array.
  const pathArray = routePath.split('/');
  // We pop the filename off the path array because we don't want the 
  // file to be in the array. We don't need to store it in a variable
  // but there's no harm in keeping the variable here for future devs.
  const filename = pathArray.pop();
  // If the path is larger than one we have a route path to use.
  if (pathArray.length > 0) {
    // Combine what's left of the array back in to a path to the folder
    // the original file lives in.
    const prePath = '/' + pathArray.join('/');
    // Create a full path from the routepath for importing.
    const routePathFull = join(__dirname, routePath);
    // Make this router available at the specified prepath.
    router.use(prePath, require(routePathFull));
    console.log(`${prePath}:`, filename)
  } else { // Just use the file in the base path.
    const routePathFull = join(__dirname, routePath);
    router.use(require(routePathFull));
    console.log(`/:`, filename)
  }
}


// -- Exports --
module.exports = router;
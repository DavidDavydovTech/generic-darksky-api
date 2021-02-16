
// -- Package Imports --
const express = require('express');
const { readdirSync } = require('@jsdevtools/readdir-enhanced');
const { join } = require('path');


// -- Set up Vars --
const router = express.Router();
const pathToDist = join(__dirname, 'frontend', 'dist');

// -- Init file list --
try {
  fileArray = readdirSync(pathToDist, {deep: true, sep: "/"});
  console.log(fileArray)
  if (Array.isArray(fileArray) === false || fileArray.length < 1) {
    throw new Error('COULDN\'T FIND ANY FILES IN DIST (Did you compile the frontend for production yet?');
  }
} catch (err) {
  throw err;
}


// -- File Server --
console.log(fileArray);
router.get('/*', (req, res) => {
  const pathMatches = req.originalUrl.match(/((?<=\/)([^?#]{0,})|(\/))/g);
  console.log('Current req path is:', pathMatches)
  if (pathMatches[0] === '/' && pathMatches[1] === '') {
    const completePath = join(pathToDist, 'index.html');
    res.status(200).sendFile(completePath);
  } else if (fileArray.includes(pathMatches[1])) {
    const completePath = join(pathToDist, pathMatches[1]);
    res.status(200).sendFile(completePath); 
  } else {
    const completePath = join(pathToDist, 'index.html');
    res.status(404).sendFile(completePath)
  }
})


// -- Exports --
module.exports = router;
const createErrorReporter = (res, showDetails) => {
  return ({devMessage, status, errorObject, additionalDetails}) => {
    // Create the response object
    const response = { message: devMessage };
    // Add error details if requested
    if (showDetails === true) {
      // These are properties we want to display as details. They can be 
      // found in the standard JavaScript error objects.
      const { 
        name, 
        message,
        fileName,
        lineNumber,
        columnNumber,
      } = errorObject;

      response.errorDetails = {
        name,
        message,
        location: `Error occured in ${fileName} at line ${lineNumber} and column ${columnNumber}`,
      };
    }
    if (additionalDetails) {
      response.additionalDetails = additionalDetails;
    }
    // Return the error response.
    res.status(status).send({ error: response });
    res.reportError = true;
  };
}

const reportError = async (req, res, next) => {
  const { generic_darksky_api_debug_enabled } = req.headers;
  let showDetails = false;
  if (generic_darksky_api_debug_enabled === 'true') showDetails = true;
  res.reportError = createErrorReporter(res, showDetails);
  next();
}

module.exports = reportError;
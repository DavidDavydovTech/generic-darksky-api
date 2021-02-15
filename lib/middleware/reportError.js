const createErrorReporter = (res, showDetails) => {
  return async ({devMessage, status, errorObject}) => {
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
        columnNumber
      } = errorObject;

      response.errorDetails = {
        name,
        message,
        location: `${fileName}: line ${lineNumber} column ${columnNumber}`,
      };
    }
    // Return the error response.
    res.status(status).send({ error: response });
  };
}

const reportError = async (req, res, next) => {
  const { generic_darksky_api_debug_enabled } = req.headers;
  let showDetails = false;
  if (generic_darksky_api_debug_enabled === 'true') showDetails = true;
  res.reportError = createErrorReporter(res, showDetails);
  console.log(res.reportError);
  next();
}

module.exports = reportError;
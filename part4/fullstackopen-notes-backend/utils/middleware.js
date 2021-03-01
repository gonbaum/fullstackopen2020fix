const logger = require('./logger')

/*----------------------
 middlewares definitions
----------------------*/

// Custom middleware to log pretty requests
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// Custom middleware to handle unknown routes. Loaded after routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Custom middleware to handle and log errors. Loaded after routes
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  // Handle id format error
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformated id'
    })
    // Handle validation errors
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
    // Handle token errors
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  logger.error(error.message)

  next(error)
  /* The error that is passed forwards is given to the next function as a parameter.
     If next was called without a parameter, then the execution would simply move onto the next route or middleware.
     If the next function is called with a parameter, then the execution will continue to the error handler middleware.*/
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}

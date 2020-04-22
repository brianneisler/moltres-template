const mod = {
  setupMiddleware: () => (error, request, response, next) => {
    // Express default error handler needs to handle errors when the headers have
    // already been sent according to the documentation
    // https://expressjs.com/en/guide/error-handling.html
    if (response.headersSent) {
      return next(error)
    }

    const { code, message, statusCode, timestamp } = error
    response.status(statusCode || 500)
    response.json({
      error: {
        code: code || 123,
        message
      },
      status: 'error',
      timestamp: timestamp || Date.now()
    })
  }
}

export default mod

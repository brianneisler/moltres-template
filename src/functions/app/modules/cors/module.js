const mod = {
  setupMiddleware: () => (request, response, next) => {
    // If we're in development. Allow all origins.
    if (process.env.NODE_ENV === 'development') {
      response.setHeader('Access-Control-Allow-Origin', '*')
      // Here allow all the HTTP methods you want
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,HEAD,PUT,OPTIONS')
      // Here you allow the headers for the HTTP requests to your server
      response.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      )
    }
    next()
  }
}

export default mod

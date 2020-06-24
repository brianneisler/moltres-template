import logger from 'redux-logger'

const mod = (config) => {
  let middleware = []
  if (config.core.debug) {
    middleware = [logger]
  }
  return {
    middleware
  }
}

export default mod

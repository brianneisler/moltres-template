if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}

const createEngine = require('./createEngine').default

export {
  createEngine
}

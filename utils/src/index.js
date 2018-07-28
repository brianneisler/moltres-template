if (!global._babelPolyfill) {
  // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}

// NOTE BRN: These tools should ONLY include ones
// that are compatible with react-native
const config = require('./config')
const data = require('./data')
const firebase = require('./firebase')
const graph = require('./graph')
const path = require('./path')
const throwable = require('./throwable')
const walk = require('./walk')

module.exports = {
  ...config,
  ...data,
  ...firebase,
  ...graph,
  ...path,
  ...throwable,
  ...walk
}

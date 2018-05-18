if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}
require('source-map-support/register') // eslint-disable-line global-require

// NOTE BRN: These tools should ONLY include ones
// that are compatible with react-native
const data = require('./data')
const graph = require('./graph')
const path = require('./path')

module.exports = {
  ...data,
  ...graph,
  ...path
}

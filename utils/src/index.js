if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}
require('source-map-support/register') // eslint-disable-line global-require

const data = require('./data')
const env = require('./env')
const graph = require('./graph')

module.exports = {
  ...data,
  ...env,
  ...graph
}

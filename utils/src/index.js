if (!global._babelPolyfill) {
  // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}

// NOTE BRN: These tools should ONLY include ones
// that are compatible with react-native
const buffer = require('./buffer')
const crypto = require('./crypto')
const data = require('./data')
const fetch = require('./fetch')
const firebase = require('./firebase')
const graph = require('./graph')
const mime = require('./mime')
const path = require('./path')
const saga = require('./saga')
const stream = require('./stream')
const throwable = require('./throwable')
const walk = require('./walk')

module.exports = {
  ...buffer,
  ...crypto,
  ...data,
  ...fetch,
  ...firebase,
  ...graph,
  ...mime,
  ...path,
  ...saga,
  ...stream,
  ...throwable,
  ...walk
}

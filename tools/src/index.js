if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}
require('source-map-support/register') // eslint-disable-line global-require

const build = require('./build').default
const clean = require('./clean').default
const cleanse = require('./cleanse').default
const createContext = require('./createContext').default
const deploy = require('./deploy').default
const lint = require('./lint').default
const run = require('./run').default
const setup = require('./setup').default
const start = require('./start').default
const test = require('./test').default

export {
  build,
  clean,
  cleanse,
  createContext,
  deploy,
  lint,
  run,
  setup,
  start,
  test
}

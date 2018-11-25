  // eslint-disable-next-line no-underscore-dangle
if (!global._babelPolyfill) {
  // eslint-disable-next-line global-require
  require('@babel/polyfill')
}
// eslint-disable-next-line global-require
require('source-map-support/register')

const build = require('./build').default
const clean = require('./clean').default
const cleanse = require('./cleanse').default
const createContext = require('./createContext').default
const deploy = require('./deploy').default
const lint = require('./lint').default
const loadEnv = require('./loadEnv').default
const loadPlugins = require('./loadPlugins').default
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
  loadEnv,
  loadPlugins,
  run,
  setup,
  start,
  test
}

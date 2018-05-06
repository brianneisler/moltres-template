if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}
require('source-map-support/register') // eslint-disable-line global-require

const build = require('./build')
const clean = require('./clean')
const cleanse = require('./cleanse')
const deploy = require('./deploy')
const lint = require('./lint')
const run = require('./run')
const setup = require('./setup')
const start = require('./start')
const test = require('./test')

export {
  build,
  clean,
  cleanse,
  deploy,
  lint,
  run,
  setup,
  start,
  test
}

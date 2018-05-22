if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}

const actions = require('./actions')
const actionChannel = require('./actionChannel').default
const all = require('./all').default
const apply = require('./apply').default
const call = require('./call').default
const cancel = require('./cancel').default
const cancelled = require('./cancelled').default
const channel = require('./channel').default
const combineAction = require('./combineAction').default
const cps = require('./cps').default
const createAction = require('./createAction').default
const createActions = require('./createActions').default
const createEngine = require('./createEngine').default
const delay = require('./delay').default
const eventChannel = require('./eventChannel').default
const flush = require('./flush').default
const fork = require('./fork').default
const getContext = require('./getContext').default
const handleAction = require('./handleAction').default
const handleActions = require('./handleActions').default
const join = require('./join').default
const put = reqire('./put').default
const race = require('./race').default
const select = require('./select').default
const setContext = require('./setContext').default
const spawn = require('./spawn').default
const take = require('./take').default
const takeEvery = require('./takeEvery').default
const takeLatest = require('./takeLatest').default
const throttle = require('./throttle').default

module.exports = {
  ...actions,
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cancelled,
  channel,
  combineAction,
  cps,
  createAction,
  createActions,
  createEngine,
  delay,
  eventChannel,
  flush,
  fork,
  getContext,
  handleAction,
  handleActions,
  join,
  put,
  race,
  select,
  setContext,
  spawn,
  take,
  takeEvery,
  takeLatest,
  throttle
}

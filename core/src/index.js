if (!global._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('babel-polyfill') // eslint-disable-line global-require
}

const actions = require('./actions')
const actionChannel = require('./actionChannel').default
const all = require('./all').default
const apply = require('./apply').default
const asyncChannel = require('./asyncChannel').default
const buffers = require('./buffers').default
const call = require('./call').default
const cancel = require('./cancel').default
const cancelled = require('./cancelled').default
const channel = require('./channel').default
const compose = require('./compose').default
const config = require('./config').default
const combineActions = require('./combineActions').default
const cps = require('./cps').default
const createAction = require('./createAction').default
const createActions = require('./createActions').default
const createChannel = require('./createChannel').default
const createEngine = require('./createEngine').default
const createFactory = require('./createFactory').default
const delay = require('./delay').default
const END = require('./END').default
const eventChannel = require('./eventChannel').default
const flush = require('./flush').default
const fork = require('./fork').default
const getConfig = require('./getConfig').default
const getContext = require('./getContext').default
const handleAction = require('./handleAction').default
const handleActions = require('./handleActions').default
const isEnd = require('./isEnd').default
const join = require('./join').default
const mapProps = require('./mapProps').default
const put = require('./put').default
const race = require('./race').default
const runSaga = require('./runSaga').default
const select = require('./select').default
const selectWait = require('./selectWait').default
const setConfig = require('./setConfig').default
const setContext = require('./setContext').default
const spawn = require('./spawn').default
const take = require('./take').default
const takeEvery = require('./takeEvery').default
const takeLatest = require('./takeLatest').default
const throttle = require('./throttle').default
const updateContext = require('./updateContext').default
const watchChannel = require('./watchChannel').default
const withConfig = require('./withConfig').default
const withContext = require('./withContext').default
const withDefaults = require('./withDefaults').default
const withProps = require('./withProps').default
const wrapActionCreators = require('./wrapActionCreators').default

module.exports = {
  ...actions,
  actionChannel,
  all,
  apply,
  asyncChannel,
  buffers,
  call,
  cancel,
  cancelled,
  channel,
  combineActions,
  compose,
  config,
  cps,
  createAction,
  createActions,
  createChannel,
  createEngine,
  createFactory,
  delay,
  END,
  eventChannel,
  flush,
  fork,
  getConfig,
  getContext,
  handleAction,
  handleActions,
  isEnd,
  join,
  mapProps,
  put,
  race,
  runSaga,
  select,
  selectWait,
  setConfig,
  setContext,
  spawn,
  take,
  takeEvery,
  takeLatest,
  throttle,
  updateContext,
  watchChannel,
  withConfig,
  withContext,
  withDefaults,
  withProps,
  wrapActionCreators
}

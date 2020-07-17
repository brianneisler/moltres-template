import {
  call,
  channel,
  handleChannel,
  lockChannel,
  select,
  slidingBuffer,
  spawn,
  take
} from '../utils/redux'
import {
  createPath,
  equals,
  getPath,
  invariant,
  isFunction,
  isObject,
  isString,
  uuidv4
} from '../utils/lang'
import addQueryWatcher from './addQueryWatcher'
import addQueryWatcherTask from './addQueryWatcherTask'
import assocStatePath from './assocStatePath'
import removeQueryWatcherTask from './removeQueryWatcherTask'

const watchQuery = function* ({
  context,
  factory,
  initialState,
  queryKey,
  watcherOptions
}) {
  invariant(isObject(context), 'context must be a defined Object')
  invariant(isFunction(factory), 'factory must be a defined Function')
  invariant(isObject(initialState), 'initialState must be a Object')
  invariant(isString(queryKey), 'queryKey must be a String')

  const queryChannel = lockChannel()
  const statePath = `query.${queryKey}.results${
    watcherOptions.resultsPath ? '.' + watcherOptions.resultsPath : ''
  }`
  const { handler, waitForFirst = true } = watcherOptions
  const path = createPath(statePath)
  const stateChannel = channel(slidingBuffer(1))
  const id = uuidv4()

  // NOTE BRN: Make sure that this function doesn't return until the first state
  // has been set. Need this for SSR
  let first = true
  const task = yield spawn(handleChannel, queryChannel, function* (action) {
    if (action.type === 'refresh') {
      if (queryChannel.isLocked()) {
        throw new Error(
          'refreshState was called while the channel was already refreshing. This should not happen.'
        )
      }
      queryChannel.lock()

      // Do refresh...
      // NOTE BRN: This was removed because it causes old state to stick around
      // when a value has been removed. Instead, we want to start from a fresh
      // object everytime and let the factory rebuild the state
      const currentState = yield select((state) => getPath(path, state))
      const nextState = yield call(factory, initialState, queryChannel, context)
      const changed = !equals(currentState, nextState)

      if (changed) {
        yield call(assocStatePath, path, nextState)
        if (handler) {
          yield* handler(nextState)
        }
      }
      queryChannel.release()

      if (changed || first) {
        first = false
        stateChannel.put({ state: nextState })
      }
    } else if (action.type === 'add_task') {
      yield call(addQueryWatcherTask, queryKey, id, action.payload.task)
    } else if (action.type === 'remove_task') {
      yield call(removeQueryWatcherTask, queryKey, id, action.payload.task)
    } else {
      throw new Error(
        `Unknown action type received by query watcher - ${action}`
      )
    }
  })

  // Trigger the first refresh so that we start the query process
  queryChannel.put({ type: 'refresh' })

  // wait for the first refresh to complete before returning back
  if (waitForFirst) {
    yield take(stateChannel)
  }

  return yield call(addQueryWatcher, queryKey, {
    id,
    stateChannel,
    statePath,
    task
  })
}

export default watchQuery

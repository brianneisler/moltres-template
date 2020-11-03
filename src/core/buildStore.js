import { reduxBatch } from '@manaflair/redux-batch'
import { applyMiddleware } from 'redux'

import {
  assocPath,
  createPath,
  forEachObjIndexed,
  getPath,
  getProperty,
  map,
  mergeRight,
  select,
  values
} from '../utils/lang'

import { setContextAction } from './actions'
import _finally from './finally'
import { selectConfig, selectContext } from './selectors'
import setup from './setup'
import start from './start'
import stop from './stop'
import {
  buildMiddleware,
  combineReducers,
  composeStore,
  filterReducers
} from './util'

const engineEnhancer = (modules) => (createStore) => (
  reducer,
  initialState
) => {
  const _store = createStore(reducer, initialState)
  const getContext = (selector) => {
    return select(selector, selectContext(_store.getState()))
  }
  return {
    ..._store,
    dispatch(...args) {
      return _store.dispatch(...args)
    },
    getConfig: (selector) => {
      return select(selector, selectConfig(_store.getState()))
    },
    getContext,
    getModule: (selector) => getProperty(selector, modules),
    getModules: () => modules,
    setContext: ({ selector, value }) => {
      return _store.dispatch(
        setContextAction(getContext(), { selector, value })
      )
    },
    setup: (store) => {
      const context = store.getContext()
      context.logger.debug('Setting up engine...')
      forEachObjIndexed((module) => {
        setup(store, module)
      }, store.getModules())
      context.logger.debug('Engine has been setup!') // eslint-disable-line no-console
      return store
    },
    start: (store) => {
      const context = store.getContext()
      context.logger.debug('Starting engine...')
      forEachObjIndexed((module) => {
        start(store, module)
      }, store.getModules())
      context.logger.debug('Engine has started!')
      return store
    },
    stop: async (store) => {
      await map(async (module) => {
        await stop(store, module)
      }, values(store.getModules()))

      await map(async (module) => {
        await _finally(store, module)
      }, values(store.getModules()))

      return store
    }
  }
}

const buildReducer = (reducer) => (state, action) => {
  state = reducer(state, action)
  // NOTE BRN: These actions are handled at the root at the very end of reducing
  // so that they can modify the state AFTER all reducers have updated the state.
  if (action) {
    if (action.type === 'ASSOC_STATE') {
      return assocPath(
        createPath(action.payload.path),
        action.payload.state,
        state
      )
    } else if (action.type === 'MERGE_STATE') {
      const statePath = createPath(action.payload.path)
      const currentState = getPath(statePath, state) || {}
      return assocPath(
        statePath,
        mergeRight(currentState, action.payload.state),
        state
      )
    }
  }
  return state
}

const buildEnhancers = (modules) => {
  const middleware = buildMiddleware(modules)
  return [
    reduxBatch,
    applyMiddleware(...middleware),
    engineEnhancer(modules),
    reduxBatch
  ]
}

const buildStore = (modules, initialState) =>
  composeStore(
    buildReducer(combineReducers(filterReducers(modules))),
    buildEnhancers(modules),
    initialState
  )

export default buildStore

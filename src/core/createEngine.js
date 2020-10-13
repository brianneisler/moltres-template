import {
  forEachObjIndexed,
  getProperty,
  map,
  select,
  values
} from '../utils/lang'

import { setContextAction } from './actions'
import _finally from './finally'
import * as coreModules from './modules'
import { selectConfig, selectContext } from './selectors'
import setup from './setup'
import start from './start'
import stop from './stop'
import buildStore from './util/buildStore'
import createModules from './util/createModules'

const createEngine = (
  modules = {},
  context = {
    config: {}
  },
  initialState = {}
) => {
  const { config } = context
  const instances = createModules(context, {
    ...coreModules,
    ...modules
  })

  const _store = buildStore(instances, {
    ...initialState,
    config,
    context
  })
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
    getModule: (selector) => getProperty(selector, instances),
    getModules: () => instances,
    setContext: ({ selector, value }) => {
      return _store.dispatch(
        setContextAction(getContext(), { selector, value })
      )
    },
    setup: (store) => {
      context.logger.debug('Setting up engine...')
      forEachObjIndexed((module) => {
        setup(store, module)
      }, store.getModules())
      context.logger.debug('Engine has been setup!') // eslint-disable-line no-console
      return store
    },
    start: (store) => {
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

export default createEngine

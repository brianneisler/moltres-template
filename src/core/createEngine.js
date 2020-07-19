import { forEachObjIndexed, getProp, map, select, values } from '../utils/lang'

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
  config = {},
  context = {},
  initialState = {}
) => {
  const instances = createModules(config, context, {
    ...coreModules,
    ...modules
  })

  const _store = buildStore(instances, {
    ...initialState,
    config,
    context
  })
  return {
    ..._store,
    dispatch(...args) {
      return _store.dispatch(...args)
    },
    getConfig: (selector) => {
      return select(selector, selectConfig(_store.getState()))
    },
    getContext: (selector) => {
      return select(selector, selectContext(_store.getState()))
    },
    getModule: (selector) => getProp(selector, instances),
    getModules: () => instances,
    setContext: ({ selector, value }) => {
      return _store.dispatch(setContextAction({ selector, value }))
    },
    setup: (store) => {
      context.logger.info('Setting up engine...')
      forEachObjIndexed((module) => {
        setup(store, module)
      }, store.getModules())
      context.logger.info('Engine has been setup!') // eslint-disable-line no-console
      return store
    },
    start: (store) => {
      context.logger.info('Starting engine...')
      forEachObjIndexed((module) => {
        start(store, module)
      }, store.getModules())
      context.logger.info('Engine has started!')
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

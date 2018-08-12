import { forEachObjIndexed, get, mapAll, set, values } from 'moltres-utils'
import _finally from '../finally'
import setup from '../setup'
import start from '../start'
import stop from '../stop'
import buildStore from './buildStore'
import createModules from './createModules'

const createStore = (modules, config, context) => {
  const instances = createModules(config, modules)

  const newStore = {
    ...buildStore(instances),
    getModules: () => instances,
    getConfig: (selector) => get(selector, config),
    getContext: (selector) => get(selector, context),
    setContext: (selector, value) => {
      context = set(selector, value, context)
    },
    setup: (store) => {
      forEachObjIndexed((module) => {
        setup(store, module)
      }, store.getModules())
      console.log('modules have been setup') // eslint-disable-line no-console
      return store
    },
    start: (store) => {
      forEachObjIndexed((module) => {
        start(store, module)
      }, store.getModules())
      return store
    },
    stop: async (store) => {
      await mapAll(async (module) => {
        await stop(store, module)
      }, values(store.getModules()))

      await mapAll(async (module) => {
        await _finally(store, module)
      }, values(store.getModules()))

      return store
    }
  }
  return start(setup(newStore))
}

export default createStore

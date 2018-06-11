import buildModules from './buildModules'
import buildStore from './buildStore'
import setupStore from './setupStore'
import startStore from './startStore'

const createStore = (modules, config) => {
  const builtModules = buildModules(modules, config)
  const store = {
    ...buildStore(builtModules),
    getModules: () => builtModules,
    getConfig: () => config
  }
  return startStore(setupStore(store))
}

export default createStore

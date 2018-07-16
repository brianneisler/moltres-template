import buildModules from './buildModules'
import buildStore from './buildStore'
import setupStore from './setupStore'
import startStore from './startStore'
import stopStore from './stopStore'

const createStore = (modules, config) => {
  const builtModules = buildModules(modules, config)
  let context = {}
  const store = {
    ...buildStore(builtModules),
    getModules: () => builtModules,
    getConfig: () => config,
    getContext: () => context,
    setContext: (props) => {
      context = {
        ...context,
        ...props
      }
    },
    stop: async () => stopStore(store)
  }
  return startStore(setupStore(store))
}

export default createStore

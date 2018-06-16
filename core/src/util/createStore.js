import buildModules from './buildModules'
import buildStore from './buildStore'
import setupStore from './setupStore'
import startStore from './startStore'

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
    }
  }
  return startStore(setupStore(store))
}

export default createStore

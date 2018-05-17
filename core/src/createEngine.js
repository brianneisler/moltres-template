import { createStore } from 'duxegg'

// TODO BRN: instead of passing modules into this method they should be loaded from moltres.json
const createEngine = (modules, config) => {
  const store = createStore(modules, config)
  return store
}

export default createEngine

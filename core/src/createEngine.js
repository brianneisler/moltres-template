import core from './modules/core'
import { createStore } from './util'

// TODO BRN: instead of passing modules into this method they should be loaded from moltres.json
const createEngine = (modules, config) => {
  const store = createStore({
    core,
    ...modules
  }, config)
  return store
}

export default createEngine

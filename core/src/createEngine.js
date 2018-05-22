import { createStore } from 'duxegg'
import app from './modules/app'
import saga from './modules/saga'

// TODO BRN: instead of passing modules into this method they should be loaded from moltres.json
const createEngine = (modules, config) => {
  const store = createStore({
    app,
    saga,
    ..modules
  }, config)
  return store
}

export default createEngine

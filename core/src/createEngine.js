import { isFunction } from 'moltres-utils'
import core from './modules/core'
import { createStore } from './util'

// TODO BRN: instead of passing modules into this method they should be loaded from moltres.json
const createEngine = (
  maybeModules = {},
  configOrFunction = {},
  contextOrFunction = {},
  options = {}
) => {
  const modules = {
    core,
    ...maybeModules
  }
  let context = contextOrFunction
  if (isFunction(contextOrFunction)) {
    context = contextOrFunction(options)
  }

  let config = configOrFunction
  if (isFunction(configOrFunction)) {
    config = configOrFunction(modules, context)
  }
  const store = createStore(modules, config, context)
  return store
}

export default createEngine

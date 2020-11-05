import { invariant, isObject } from '../utils/lang'

import buildStore from './buildStore'
import createContext from './createContext'
import * as coreModules from './modules'
import { createModules } from './util'

const createEngine = (modules = {}, context, initialState = {}) => {
  context = createContext(context)
  const { config } = context
  invariant(
    isObject(config),
    'Config must be defined within `context` and must be an Object'
  )
  const instances = createModules(context, {
    ...coreModules,
    ...modules
  })

  return buildStore(instances, {
    ...initialState,
    config,
    context
  })
}

export default createEngine

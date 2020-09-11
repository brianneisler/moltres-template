import { loadProjectConfigSync } from '../config'
import * as coreModules from '../core/modules'

const setupFunctionConfig = (modules) => {
  return loadProjectConfigSync({
    modules: {
      ...coreModules,
      ...modules
    },
    target: 'function'
  })
}

export default setupFunctionConfig

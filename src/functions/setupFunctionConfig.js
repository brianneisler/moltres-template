import * as coreModules from '../core/modules'
import { loadConfigSync } from '../utils/config'

const setupFunctionConfig = (modules) => {
  return loadConfigSync({
    modules: {
      ...coreModules,
      ...modules
    }
  })
}

export default setupFunctionConfig
